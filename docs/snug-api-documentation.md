# Snug API Documentation

> **STATUS**: Documentation is ahead of API implementation. API endpoints will be updated to match this documentation in a few days (as of July 27, 2025).
> 
> **TESTING**: Cannot test until GetSnug updates their API to match this documentation.
> 
> **STAGING**: No staging environment provided - use production only.

This documentation provides comprehensive guidance for authenticating with the Snug API and creating new clients through the professional interface.

## Base URLs

- **Production**: `https://api.getsnug.com`
- ~~**Staging**: `https://api.staging.getsnug.com`~~ *(Not available)*

## Authentication Flow

### 1. Obtain JWT Token

**Endpoint**: `POST /api/token/`

**Description**: Authenticate with email and password to receive JWT access and refresh tokens.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Success Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Error Responses**:

*401 Unauthorized - Invalid credentials:*
```json
{
  "detail": "No active account found with the given credentials"
}
```

*400 Bad Request - Missing fields:*
```json
{
  "email": ["This field is required."],
  "password": ["This field is required."]
}
```

### Token Refresh (Optional)

**Endpoint**: `POST /api/token/refresh/`

**Request Body**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Success Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### 2. Get User Profile and Professional Group Information

**Endpoint**: `GET /api/v3/user-data/`

**Description**: Retrieve the authenticated user's profile information, including their user data ID (ud_id) and professional group details needed for client creation.

**Request Headers**:
```
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `expand=professional_group_role` (required): Expands the professional group role information

**Request URL**:
```
GET /api/v3/user-data/?expand=professional_group_role
```

**Success Response** (200 OK):
```json
{
  "data": {
    "ud_id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "Professional Name",
    "contact_email": "professional@example.com",
    "phone": "+1-555-123-4567",
    "address_text": "123 Main St, City, ST 12345",
    "estate_plan_foundation": "attorney",
    "value_of_assets": "up_to_five",
    "household_state_code": "CA",
    "created_at": "2024-01-15T10:30:00Z",
    "professional_group_role_user_data": {
      "id": "987e6543-e89b-12d3-a456-426614174005",
      "role": "PRO_GROUP_ADMIN",
      "created_at": "2024-01-15T10:30:00Z",
      "professional_group": {
        "id": "654e3210-e89b-12d3-a456-426614174004",
        "name": "Estate Planning Professionals LLC",
        "default_will_price": "29999",
        "default_trust_price": "59999",
        "allow_agent_custom_client_pricing": true,
        "allow_wills": true,
        "allow_trusts": true
      },
      "user_data": {
        "ud_id": "123e4567-e89b-12d3-a456-426614174000",
        "full_name": "Professional Name",
        "contact_email": "professional@example.com"
      }
    }
  }
}
```

**Important Values for Next Steps**:
- `data.ud_id`: Use this as the `{ud_id}` parameter in client creation
- `data.professional_group_role_user_data.professional_group.id`: Use this as the `{pro_group_id}` parameter in client creation
- `data.professional_group_role_user_data.role`: Determines permissions (PRO_GROUP_ADMIN vs other roles)
- `data.professional_group_role_user_data.professional_group.allow_agent_custom_client_pricing`: Determines if custom pricing is allowed

**Error Responses**:

*401 Unauthorized - Invalid or expired token:*
```json
{
  "detail": "Given token not valid for any token type"
}
```

*404 Not Found - User has no professional group role:*
```json
{
  "detail": "Not found."
}
```

## Client Creation API

### 3. Create New Client

**Endpoint**: `POST /api/v3/{ud_id}/pro-group/{pro_group_id}/households/`

**Description**: Create a new client household for a professional group.

**Path Parameters**:
- `ud_id` (UUID): User data ID of the requesting professional
- `pro_group_id` (UUID): Professional group ID

**Request Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "client_data": {
    "full_name": "John Doe",
    "contact_email": "john.doe@example.com",
    "estate_plan_foundation": "will",
    "value_of_assets": "up_to_five",
    "household_state_code": "CA",
    "show_household_onboarding_requirement": false,
    "blended_family": false,
    "children": "adult"
  },
  "client_role": {
    "recommendation_trust": false,
    "recommendation_will": false,
    "recommendation_fpoa": false,
    "recommendation_hcd": false,
    "will_price": 29999,
    "trust_price": 59999,
    "professional_pricing_option": "DEFAULT",
    "block_will": false,
    "block_trust": false
  },
  "spouse_data": {
    "full_name": "Jane Doe",
    "contact_email": "jane.doe@example.com",
    "marital_status": "married"
  }
}
```

### Request Field Descriptions

#### client_data (required)
- `full_name` (string, required): Full name of the client
- `contact_email` (string, required): Valid email address for the client
- `estate_plan_foundation` (string, optional): Estate planning foundation type
  - Options: `"attorney"`, `"joint"`, `"trust"`, `"will"`
- `value_of_assets` (string, optional): Net worth category
  - Options: `"exempt"`, `"up_to_one"`, `"up_to_five"`, `"up_to_ten"`, `"over_ten"`
- `household_state_code` (string, optional): Two-letter state code (e.g., "CA", "NY", "TX")
- `show_household_onboarding_requirement` (boolean, optional): Whether to show onboarding requirements
- `blended_family` (boolean, optional): Whether this is a blended family
- `children` (string, optional): Children status
  - Options: `"none"`, `"adult"`, `"minor"`

#### client_role (required)
- `recommendation_trust` (boolean, optional): Recommend trust creation
- `recommendation_will` (boolean, optional): Recommend will creation
- `recommendation_fpoa` (boolean, optional): Recommend financial power of attorney
- `recommendation_hcd` (boolean, optional): Recommend healthcare directive
- `will_price` (number, optional): Custom will price (admin or custom pricing permission required)
- `trust_price` (number, optional): Custom trust price (admin or custom pricing permission required)
- `professional_pricing_option` (string, optional): Use professional pricing
- `block_will` (boolean, optional): Block will creation for this client
- `block_trust` (boolean, optional): Block trust creation for this client

#### spouse_data (optional)
- `full_name` (string, required if spouse_data provided): Spouse's full name
- `contact_email` (string, required if spouse_data provided): Spouse's email (must be different from client email)
- `marital_status` (string, optional): Type of relationship
  - Options: `"married"`, `"domestic_partnership"`, `"civil_union"`

### Success Response (201 Created)

```json
{
  "data": {
    "head_of_household": {
      "ud_id": "123e4567-e89b-12d3-a456-426614174000",
      "full_name": "John Doe",
      "contact_email": "john.doe@example.com",
      "estate_plan_foundation": "will",
      "value_of_assets": "up_to_five",
      "household_state_code": "CA",
      "children": "adult",
      "blended_family": false,
      "created_at": "2024-01-15T10:30:00Z"
    },
    "household_role": {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "role": "FINANCIAL_PROFESSIONAL_CLIENT",
      "recommendation_trust": true,
      "recommendation_will": true,
      "recommendation_fpoa": false,
      "recommendation_hcd": false,
      "will_price": "29999",
      "trust_price": "59999",
      "block_will": false,
      "block_trust": false,
      "created_at": "2024-01-15T10:30:00Z"
    },
    "household_member_roles": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174002",
        "role": "SPOUSE",
        "role_target_user_data": {
          "ud_id": "321e6547-e89b-12d3-a456-426614174003",
          "full_name": "Jane Doe",
          "contact_email": "jane.doe@example.com"
        },
        "spouse_relationship": "married",
        "is_household_member": true
      }
    ],
    "professional_advisor": {
      "ud_id": "654e3210-e89b-12d3-a456-426614174004",
      "full_name": "Professional Name",
      "contact_email": "professional@example.com"
    },
    "professional_group": {
      "id": "987e6543-e89b-12d3-a456-426614174005",
      "name": "Professional Group Name",
      "default_will_price": "299.99",
      "default_trust_price": "599.99"
    },
    "is_professional": false
  }
}
```

### Error Responses

#### 400 Bad Request - Missing Required Fields
```json
{
  "details": "client_data and client_role are required"
}
```

#### 400 Bad Request - Client Already Exists
```json
{
  "details": "Client already exists"
}
```

#### 400 Bad Request - Same Email for Client and Spouse
```json
{
  "details": "Client and spouse cannot have the same email address"
}
```

#### 401 Unauthorized - Invalid Token
```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is invalid or expired"
    }
  ]
}
```

#### 403 Forbidden - Custom Pricing Not Allowed
```json
{
  "details": "You do not have permission to set custom prices for clients"
}
```

#### 404 Not Found - Invalid Professional Group
```json
{
  "detail": "Not found."
}
```

## Authentication Headers

For all API calls after obtaining the token, include the JWT token in the Authorization header:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## Data Validation Rules

1. **Email Validation**: All email fields must be valid email addresses
2. **Unique Client Email**: Client email must be unique within the professional's client list
3. **Different Emails**: Client and spouse must have different email addresses
4. **State Codes**: Must be valid two-letter US state codes
5. **Pricing Permissions**: Custom pricing requires admin role or explicit permission
6. **UUID Format**: All ID parameters must be valid UUIDs

## Rate Limiting

- Standard rate limiting applies to all endpoints
- Authentication endpoints may have stricter limits to prevent brute force attacks

## Example Implementation (JavaScript)

```javascript
// Base URL
const BASE_URL = "https://api.getsnug.com";

// Step 1: Authenticate
const authenticate = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const tokens = await response.json();
  return tokens.access;
};

// Step 2: Get user profile and professional group information
const getUserProfile = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/api/v3/user-data/?expand=professional_group_role`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }

  const profileData = await response.json();
  return {
    udId: profileData.data.ud_id,
    proGroupId: profileData.data.professional_group_role_user_data.professional_group.id,
    role: profileData.data.professional_group_role_user_data.role
  };
};

// Step 3: Create client
const createClient = async (accessToken, udId, proGroupId, clientData) => {
  const response = await fetch(`${BASE_URL}/api/v3/${udId}/pro-group/${proGroupId}/households/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clientData)
  });

  if (!response.ok) {
    throw new Error('Failed to create client');
  }

  return await response.json();
};

// Complete workflow example
const createSnugClient = async (email, password, clientInfo) => {
  try {
    // Step 1: Authenticate
    const accessToken = await authenticate(email, password);
    
    // Step 2: Get user profile
    const { udId, proGroupId } = await getUserProfile(accessToken);
    
    // Step 3: Create client
    const clientData = {
      client_data: {
        full_name: clientInfo.fullName,
        contact_email: clientInfo.email,
        estate_plan_foundation: "will",
        value_of_assets: "up_to_five",
        household_state_code: "NY",
        show_household_onboarding_requirement: false,
        blended_family: false,
        children: "none"
      },
      client_role: {
        recommendation_trust: false,
        recommendation_will: true,
        recommendation_fpoa: false,
        recommendation_hcd: false,
        professional_pricing_option: "DEFAULT",
        block_will: false,
        block_trust: false
      }
    };

    const result = await createClient(accessToken, udId, proGroupId, clientData);
    console.log('Client created successfully:', result);
    return result;
    
  } catch (error) {
    console.error('Error creating Snug client:', error);
    throw error;
  }
};
```

## Integration Notes

### Current Status (July 2025)
- **API Status**: Documentation is ahead of implementation
- **Testing**: Cannot test until GetSnug updates API (expected in a few days)
- **Authentication**: Currently requires token per request, API key access coming soon

### Future Improvements
- **API Key Authentication**: More efficient than JWT tokens for repeated requests
- **Webhook Support**: Potential for real-time notifications
- **Bulk Operations**: May be available for batch client creation

## Support

For API support or questions, contact the GetSnug development team or refer to the full API documentation available from GetSnug directly.

---

**Last Updated**: July 27, 2025  
**Status**: Awaiting API implementation to match documentation

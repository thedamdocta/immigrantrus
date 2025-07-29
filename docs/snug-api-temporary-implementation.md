# GetSnug API - Temporary Implementation Documentation

## ⚠️ IMPORTANT: TEMPORARY SOLUTION
**This implementation is temporary and will need to be updated in 1-2 weeks when GetSnug finalizes their API structure.**

---

## How the Current Workflow Works

### Overview
The GetSnug API integration creates a professional-client relationship between Marlene's law firm and new website visitors. When someone fills out the contact form on the ImmigraNts'R'Us website, they automatically become a client in GetSnug's system.

### Complete Workflow Process

#### 1. User Interaction (Website Side)
- User visits ImmigraNts'R'Us website
- User fills out contact form with their name and email
- Form submission triggers GetSnug API integration

#### 2. API Authentication Flow
```
User Form Submission → SnugApiService.createClient() → Authentication Process
```

**What happens:**
- System reads credentials from environment variables (`VITE_SNUG_EMAIL`, `VITE_SNUG_PASSWORD`)
- Makes POST request to `https://auth.getsnug.com/api/token/`
- Receives JWT access token for subsequent API calls
- Token is stored in memory for the session

#### 3. Professional Profile Retrieval
```
Authentication Success → getUserProfile() → Extract Professional Data
```

**What happens:**
- Uses JWT token to call `https://api.getsnug.com/api/v3/user-data/?expand=professional_group_role`
- Retrieves Marlene's professional information:
  - User ID: `1be45c0a-41a2-44fc-88d0-ac653bf99121`
  - Professional Group ID: `0d3f5d03-4fda-4811-86c6-0e46d650163f`
  - Role: `PRO_GROUP_ADMIN`
- This data is required to create the client relationship

#### 4. Client Creation (The Magic Happens)
```
Profile Retrieved → createClient() → Professional-Client Relationship Created
```

**What happens:**
- System takes user's name and email from the form
- Creates simplified client data structure
- Makes POST request to: `/api/v3/{marlene_id}/pro-group/{group_id}/pro-people-roles/`
- GetSnug creates a new client record and links them to Marlene's practice

#### 5. Result (What Gets Created in GetSnug)
- **New Client User Account** in GetSnug system
- **Professional Relationship** between client and Marlene
- **Default Pricing** applied (Will: $995, Trust: $1995)
- **Role Assignment**: `FINANCIAL_PROFESSIONAL_CLIENT`
- **Client gets invitation** to access their GetSnug portal (optional)

### Data Flow Diagram
```
Website Form
    ↓ (name, email)
SnugApiService
    ↓ (credentials)
Auth Server (auth.getsnug.com)
    ↓ (JWT token)
API Server (api.getsnug.com)
    ↓ (professional data)
Client Creation Endpoint
    ↓ (client relationship)
GetSnug Client Database
    ↓ (confirmation)
Website Success Page
```

### What the Client Sees
1. **Immediate**: Success message on website
2. **Later**: Optional invitation email from GetSnug to access their legal documents portal
3. **Eventually**: Can log into GetSnug to manage wills, trusts, etc. with Marlene's firm

### What Marlene Sees (In GetSnug Dashboard)
1. **New client** appears in her client list
2. **Client contact information** ready for follow-up
3. **Default pricing** set for legal services
4. **Ability to customize** client's legal service options
5. **Communication tools** to interact with client through GetSnug

---

## Current Working Implementation (July 28, 2025)

### API Flow Status
- ✅ **Step 1: Authentication** - `https://auth.getsnug.com/api/token/` - **STABLE**
- ✅ **Step 2: User Profile** - `https://api.getsnug.com/api/v3/user-data/?expand=professional_group_role` - **STABLE**
- ⚠️ **Step 3: Client Creation** - `https://api.getsnug.com/api/v3/{ud_id}/pro-group/{pro_group_id}/pro-people-roles/` - **TEMPORARY**

### Working Endpoint (TEMPORARY)
```
POST https://api.getsnug.com/api/v3/{ud_id}/pro-group/{pro_group_id}/pro-people-roles/
```

### Current Data Structure (TEMPORARY)
```json
{
  "client_data": {
    "full_name": "string",
    "contact_email": "string"
  },
  "client_role": {
    // Empty object - uses GetSnug defaults
  }
}
```

### Expected Response (TEMPORARY)
```json
{
  "data": {
    "id": "uuid",
    "role": "FINANCIAL_PROFESSIONAL_CLIENT",
    "role_target_user_data": {
      "ud_id": "uuid",
      "full_name": "string",
      "contact_email": "string",
      "created_at": "timestamp"
    },
    "will_price": 99500,
    "trust_price": 199500,
    "user_data": {
      "ud_id": "uuid",
      "full_name": "Professional Name",
      "contact_email": "professional@email.com"
    }
  }
}
```

---

## Upcoming Changes (Expected in 1-2 weeks)

### What Will Change
- **Step 3 Endpoint**: The `/pro-people-roles/` endpoint will likely be replaced
- **Data Structure**: May revert to more comprehensive client data requirements
- **Response Format**: Response structure may change

### What Will Stay the Same
- **Step 1 & 2**: Authentication and user profile retrieval should remain stable
- **Domain Structure**: `auth.getsnug.com` for auth, `api.getsnug.com` for API calls
- **Basic Flow**: 3-step process should remain the same

---

## Files to Monitor for Updates

### Primary Implementation
- `src/lib/snugApi.ts` - Main service implementation
- **Key areas to watch:**
  - `createClient()` method endpoint URL
  - `SnugClientData` interface structure
  - Response handling

### Test Files (Keep for Validation)
- `test-final-integration.js` - Working integration test
- `test-pro-people-url-variants.js` - Endpoint discovery tool
- All other `test-*.js` files for historical reference

---

## Transition Plan for API Updates

### 1. When GetSnug Notifies of Changes
- [ ] Get new API documentation
- [ ] Update endpoint URL in `src/lib/snugApi.ts`
- [ ] Update `SnugClientData` interface if data structure changes
- [ ] Update test scripts with new endpoint and data structure

### 2. Testing New Implementation
- [ ] Run `test-final-integration.js` with new endpoint
- [ ] If it fails, use `test-pro-people-url-variants.js` to discover new working endpoints
- [ ] Validate all 3 steps of the API flow work correctly

### 3. Deployment
- [ ] Update production code only after tests pass
- [ ] Monitor for any breaking changes
- [ ] Update this documentation with new permanent solution

---

## Current Performance Benchmarks

### Response Times (as of July 28, 2025)
- Authentication: ~1.7 seconds
- User Profile: ~0.4 seconds  
- Client Creation: ~0.3 seconds
- **Total Flow: ~2.4 seconds**

### Success Rates
- Authentication: 100% (stable endpoint)
- User Profile: 100% (stable endpoint)
- Client Creation: 100% (temporary endpoint working)

---

## Emergency Fallback

### If API Breaks Before New Documentation Arrives
1. Check if authentication and user profile still work
2. Use `test-pro-people-url-variants.js` to test alternative endpoints:
   - Try reverting to `/households/` endpoint
   - Test different API versions (`/api/v1/`, `/api/v2/`, `/api/v4/`)
   - Test simplified endpoint patterns

### Contact Information
- **GetSnug Support**: Contact for API updates and timeline
- **Request**: Current API documentation and timeline for changes

---

## Development Notes

### Why This Solution is Temporary
- GetSnug indicated their API endpoints are still being finalized
- The original `/households/` endpoint returned 404 Not Found
- The `/pro-people-roles/` endpoint works but wasn't in original documentation
- GetSnug is likely consolidating their API structure

### Technical Debt
- Keep all test scripts until permanent solution is confirmed
- Monitor GetSnug communications for API update announcements
- Plan for potential downtime during API transition

---

**Last Updated**: July 28, 2025  
**Next Review**: Check with GetSnug in 1 week for API update timeline  
**Status**: ✅ Working (Temporary Solution)

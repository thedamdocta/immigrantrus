# Architecture Document: ImmigrantrusCRM

## 1. System Overview
ImmigrantrusCRM is a customized Customer Relationship Management system based on the open-source TwentyCRM project. It consists of a forked and rebranded CRM application that integrates with the existing Immigrantrus website to capture and manage client data.

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Immigrantrus Ecosystem                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐ │
│  │   Main Website      │    │      ImmigrantrusCRM           │ │
│  │  (immigrantrus.org) │    │    (Internal CRM System)       │ │
│  │                     │    │                                 │ │
│  │  - Registration     │    │  - Contact Management          │ │
│  │  - User Signup      │◄───┤  - Custom Tags                 │ │
│  │  - Phone Field      │    │  - Internal User Access        │ │
│  │  - Footer Link      │    │  - Notes & Client Data         │ │
│  └─────────────────────┘    └─────────────────────────────────┘ │
│            │                                                    │
│            ▼                                                    │
│  ┌─────────────────────┐                                       │
│  │    GetSnug CRM      │                                       │
│  │   (Legacy System)   │                                       │
│  │                     │                                       │
│  │  - firstName        │                                       │
│  │  - email            │                                       │
│  └─────────────────────┘                                       │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Component Architecture

### 3.1. Main Website (Existing - Minimal Changes)
**Location:** `/Users/devon/immigrantrus/`
**Technology:** React, TypeScript, Vite
**Changes Required:**
- Add phone number field to registration form
- Add "Login to ImmigrantrusCRM" link to footer
- Modify `api/sso-auth.js` to send data to both CRMs

### 3.2. ImmigrantrusCRM (New - Forked from TwentyCRM)
**Location:** `/Users/devon/immigrantrus/crm/` (to be created)
**Technology:** 
- Backend: Node.js, NestJS, PostgreSQL, Redis, GraphQL
- Frontend: React, TypeScript, Recoil
- Infrastructure: Docker, Docker Compose

**Key Components:**
```
crm/
├── packages/
│   ├── twenty-front/          # React frontend
│   ├── twenty-server/         # NestJS backend
│   ├── twenty-emails/         # Email templates
│   └── twenty-shared/         # Shared utilities
├── docker-compose.yml         # Development environment
├── .env.example              # Environment variables template
└── README.md                 # Setup instructions
```

## 4. Data Flow Architecture

### 4.1. User Registration Flow (Safe, Independent Pattern)
```
User Fills Registration Form
         │
         ▼
┌─────────────────────┐
│   Frontend Form     │
│  - firstName        │
│  - lastName         │
│  - email            │
│  - phone (NEW)      │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  api/sso-auth.js    │
│                     │
│  1. Create Clerk    │
│     User (CRITICAL) │
│                     │
│  2. INDEPENDENT     │
│     CRM Calls:      │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│   Parallel Calls    │
│   (Non-blocking)    │
│                     │
│ ┌─────────────────┐ │
│ │ try {           │ │
│ │  GetSnug Call   │ │
│ │ } catch {       │ │
│ │  Log & Continue │ │
│ │ }               │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ try {           │ │
│ │  CRM Call       │ │
│ │ } catch {       │ │
│ │  Log & Continue │ │
│ │ }               │ │
│ └─────────────────┘ │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Return Success to   │
│ User (Regardless    │
│ of CRM Results)     │
└─────────────────────┘

Success Scenarios:
✅ Both CRMs succeed
✅ GetSnug succeeds, CRM fails
✅ GetSnug fails, CRM succeeds  
✅ Both CRMs fail (user still registered)
```

### 4.2. CRM Access Flow
```
Internal User
     │
     ▼
┌─────────────────────┐
│  Footer Link        │
│ "Login to           │
│  ImmigrantrusCRM"   │
└─────────────────────┘
     │
     ▼
┌─────────────────────┐
│ ImmigrantrusCRM     │
│ Login Page          │
│ (localhost:3000)    │
└─────────────────────┘
     │
     ▼
┌─────────────────────┐
│ CRM Dashboard       │
│ - View Contacts     │
│ - Manage Tags       │
│ - Add Notes         │
└─────────────────────┘
```

## 5. API Architecture

### 5.1. Integration API Endpoint (New)
**Endpoint:** `POST /api/contacts`
**Location:** ImmigrantrusCRM backend
**Purpose:** Receive contact data from main website

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "source": "website_registration"
}
```

**Response:**
```json
{
  "success": true,
  "contactId": "uuid-contact-id",
  "message": "Contact created successfully"
}
```

### 5.2. Modified Main Website API
**File:** `api/sso-auth.js`
**New Integration (Safe, Non-blocking Pattern):**
```javascript
// Existing GetSnug call (unchanged - already non-blocking)
try {
  console.log('🔄 Creating Snug client for SSO user...');
  const snugResponse = await fetch('http://localhost:3002/api/snug-client', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email }),
    timeout: 5000
  });
  
  if (snugResponse.ok) {
    console.log('✅ Snug client created successfully');
  } else {
    console.log('⚠️ Snug client creation failed (non-blocking)');
  }
} catch (error) {
  console.log('⚠️ Snug client creation error (non-blocking):', error.message);
  // Continue without failing the SSO process
}

// New ImmigrantrusCRM call (separate, independent, non-blocking)
try {
  console.log('🔄 Creating ImmigrantrusCRM contact for SSO user...');
  const crmResponse = await fetch('http://localhost:3001/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, phone }),
    timeout: 5000
  });
  
  if (crmResponse.ok) {
    console.log('✅ ImmigrantrusCRM contact created successfully');
  } else {
    console.log('⚠️ ImmigrantrusCRM contact creation failed (non-blocking)');
  }
} catch (error) {
  console.log('⚠️ ImmigrantrusCRM contact creation error (non-blocking):', error.message);
  // Continue without failing the SSO process
}
```

## 6. Database Architecture

### 6.1. ImmigrantrusCRM Database Schema
**Database:** PostgreSQL
**Key Tables:**
- `contacts` - Core contact information
- `contact_tags` - Many-to-many relationship for tagging
- `tags` - Predefined service categories
- `notes` - Free-text notes for contacts
- `users` - Internal CRM users

**Custom Tags to be Implemented:**
- Wills and Trust
- Estate Planning
- Immigration
- Credit Repair
- Mortgages
- Personal Injury
- Real Estate

## 7. Security Architecture

### 7.1. Access Control
- **Public Access:** Main website registration form
- **Internal Access:** ImmigrantrusCRM interface (authenticated users only)
- **API Security:** JWT tokens, rate limiting, CORS configuration

### 7.2. Data Protection
- Environment variables for sensitive configuration
- Encrypted database connections
- Input validation and sanitization
- Audit logging for data access

## 8. Deployment Architecture

### 8.1. Development Environment
```
Main Website: http://localhost:3002
ImmigrantrusCRM: http://localhost:3001
Database: PostgreSQL (Docker container)
Redis: Cache layer (Docker container)
```

### 8.2. Production Considerations
- Separate domain/subdomain for CRM access
- SSL certificates for secure communication
- Database backups and replication
- Container orchestration (Docker Compose/Kubernetes)

## 9. Integration Points

### 9.1. Frontend Integration
**File:** `src/components/ui/registration.tsx`
- Add phone number input field
- Update form validation
- Pass phone data to backend

**File:** Main layout/footer component
- Add "Login to ImmigrantrusCRM" hyperlink
- Link to CRM login page

### 9.2. Backend Integration
**File:** `api/sso-auth.js`
- Extract phone number from request
- Add non-blocking call to ImmigrantrusCRM API
- Maintain existing GetSnug functionality

## 10. Monitoring and Maintenance

### 10.1. Logging Strategy
- Application logs for both systems
- API call tracking and error handling
- User activity monitoring in CRM

### 10.2. Error Handling
- Non-blocking CRM calls to prevent signup failures
- Graceful degradation if CRM is unavailable
- Retry mechanisms for failed API calls

## 11. Future Architecture Considerations

### 11.1. Scalability
- Microservices architecture for larger scale
- API gateway for external integrations
- Horizontal scaling of CRM components

### 11.2. Extensibility
- Plugin architecture for custom features
- Webhook system for external integrations
- API versioning for backward compatibility

## 12. Technology Stack Summary

### Main Website (Existing)
- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **Authentication:** Clerk
- **Deployment:** Vercel

### ImmigrantrusCRM (New)
- **Frontend:** React, TypeScript, Recoil, Emotion
- **Backend:** NestJS, GraphQL, BullMQ
- **Database:** PostgreSQL
- **Cache:** Redis
- **Development:** Docker, Docker Compose
- **Build Tools:** Nx monorepo

This architecture ensures minimal disruption to existing functionality while providing a robust, scalable foundation for the new CRM system.

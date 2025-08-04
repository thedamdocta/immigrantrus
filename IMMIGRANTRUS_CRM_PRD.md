# Product Requirements Document: ImmigrantrusCRM

## 1. Overview
This document outlines the requirements for building a new internal Customer Relationship Management (CRM) system for Immigrantrus, to be named **ImmigrantrusCRM**. The project's goal is to create a customized CRM by forking and adapting the open-source project TwentyCRM. This CRM will be used exclusively by the internal team to manage client information and streamline workflows.

## 2. Objectives
- To establish a self-hosted, customizable CRM solution tailored to the specific needs of Immigrantrus.
- To integrate the new CRM into the existing user signup flow, ensuring new client data is captured in both ImmigrantrusCRM and the legacy GetSnug CRM.
- To provide a secure, internal-only platform for managing sensitive client data.

## 3. Target Audience
- **Primary Users:** Internal staff at Immigrantrus (e.g., case managers, legal assistants, administrative staff).
- **Secondary Users:** System administrators responsible for maintenance and user management.
- **Not a Target User:** External clients or leads.

## 4. Key Features & Requirements

### 4.1. Core CRM Functionality
- **Contact Management:** The system must be able to store and manage client contacts. At a minimum, each contact record must include:
  - Email Address
  - Phone Number
  - Notes (a free-text field for miscellaneous information)
- **Custom Tagging:** The system must support tagging contacts with the following categories to identify the type of service required:
  - Wills and Trust
  - Estate Planning
  - Immigration
  - Credit Repair
  - Mortgages
  - Personal Injury
  - Real Estate

### 4.2. Rebranding
- The forked application must be completely rebranded as "ImmigrantrusCRM". All user-facing and internal mentions of "Twenty" must be removed.

### 4.3. Integration with Signup Flow
- The CRM must be integrated into the current user registration process.
- When a new user signs up, their information must be sent to two systems:
  1. **GetSnug CRM:** Continue to receive `firstName` and `email` as it currently does.
  2. **ImmigrantrusCRM:** Receive the user's `email` and `phone`.

### 4.4. Frontend Modifications (Immigrantrus Website)
- **Registration Form:** The existing registration form must be modified to include a new input field for "Phone Number".
- **Footer Link:** A new hyperlink with the text "Login to ImmigrantrusCRM" must be added to the website's footer. This link will provide internal users with access to the CRM's login page.

### 4.5. Internal Access Only
- The CRM will be accessible only to internal staff members.
- External clients and leads will not have access to the CRM interface.
- Access will be controlled through proper authentication and authorization mechanisms.

## 5. Technical Requirements

### 5.1. Source Code
- Fork the open-source TwentyCRM repository from `https://github.com/twentyhq/twenty`
- Repository will be renamed to `ImmigrantrusCRM`
- All branding references to "Twenty" will be replaced with "ImmigrantrusCRM"

### 5.2. Technology Stack
- Based on TwentyCRM's existing stack:
  - Backend: Node.js, NestJS, PostgreSQL, Redis
  - Frontend: React, TypeScript
  - Deployment: Docker containers

### 5.3. API Integration
- Create a new API endpoint in ImmigrantrusCRM to receive contact data
- Modify existing `api/sso-auth.js` to send data to both GetSnug and ImmigrantrusCRM
- Ensure non-blocking calls to prevent signup process interruption

## 6. Constraints and Limitations
- **Minimal Disruption:** Existing functionality of the main Immigrantrus website must remain unchanged except for the specified modifications (phone field and footer link).
- **Backward Compatibility:** The GetSnug CRM integration must continue to function exactly as before.
- **Phased Approach:** The initial implementation will include only basic contact creation. Advanced questionnaire features will be added in future iterations.

## 7. Success Criteria
- ImmigrantrusCRM is successfully forked, customized, and deployed
- New user registrations create contacts in both GetSnug and ImmigrantrusCRM
- Phone number field is successfully captured and stored
- Internal users can access the CRM via the footer link
- All existing website functionality remains intact

## 8. Future Enhancements (Out of Scope for Initial Build)
- Detailed client intake questionnaire
- Advanced reporting and analytics
- Automated workflows and notifications
- Integration with other legal software systems
- Mobile responsive interface optimization

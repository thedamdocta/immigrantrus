# Architecture Notes

## Tech Stack
- React
- shadcn/ui
- Tailwind CSS
- n8n
- Docketwise API / embed
- Snug embed or redirect

## Folder Structure
- /src/pages - Main views
- /src/components - UI components
- /src/lib - Logic integrations (n8n, Docketwise, Snug)
- /src/styles - Tailwind configuration
- /src/constants - SEO/meta config

## Integration Logic
- ContactForm.tsx uses serviceType to determine routing
- webhook.ts handles n8n notifications
- docketwise.ts pushes immigration clients into CRM
- snug.ts opens estate planning portal

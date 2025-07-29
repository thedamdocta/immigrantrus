# 🌎 Immigrants R Us – Legal Website

**"Immigrants helping immigrants" – A culturally rooted, SEO-optimized, conversion-focused landing page for immigration and estate planning services.**

This project was architected using the **BMad Method** and built with **React + shadcn/ui**, designed to automate intake and build trust for a Caribbean-led immigration law firm. It supports both immigration services (via Docketwise) and estate planning (via Snug).

---

## ✨ Features

- ✅ Attorney bios (Caribbean-rooted)
- ✅ Dual-intake contact form (Immigration vs. Estate Planning)
- ✅ CRM automation via **n8n**
- ✅ Integration with [Docketwise](https://www.docketwise.com/)
- ✅ Integration with [Snug](https://www.getsnug.com/)
- ✅ SEO-optimized with structured metadata
- ✅ Blog-ready for traffic growth
- ✅ NY State–compliant attorney disclaimers

---

## 🧱 Tech Stack

| Tool          | Purpose                     |
|---------------|-----------------------------|
| React         | Frontend framework          |
| shadcn/ui     | Beautiful UI components     |
| Tailwind CSS  | Utility-first styling       |
| n8n           | Automation + email workflow |
| Docketwise    | Immigration CRM             |
| Snug          | Estate planning portal      |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/immigrantsrus-website.git
cd immigrantsrus-website

# Install dependencies
npm install

# Run the dev server
npm run dev

🔌 Integrations
📨 n8n Webhook
Triggered on form submission

Sends:

Welcome email to client

Internal notification to m*****@******.org

⚖️ Docketwise Integration
Automatically pushes immigration leads via API or iframe

🏡 Snug Integration
Opens secure trust/will dashboard for estate planning clients

📁 Folder Structure
bash
Copy
Edit
/src
  ├── components/       # shadcn components
  ├── pages/            # Page-level React components
  ├── lib/              # Logic: n8n, Docketwise, Snug
  ├── stories/          # BMad development stories
  ├── styles/           # Tailwind config
  └── constants/        # Metadata & SEO
📘 Documentation
PRD.md: Full product requirements

ARCHITECTURE.md: Dev notes & system design

/stories: Developer stories per BMad Method

👨‍⚖️ Legal Disclaimer
Attorney Advertising. Prior results do not guarantee a similar outcome. This site does not constitute legal advice. Submitting a form does not create an attorney-client relationship.

📬 Contact
For legal inquiries:
📧 m*****@******.org
🌐 immigrantsrus.org

🧠 BMad Method
This project was developed using the BMad context engineering method, broken into:

Analyst → PRD

PM → Milestones & Stories

Architect → Stack & System Layout

Now ready for Dev Agents to begin build.

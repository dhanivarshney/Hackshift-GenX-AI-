# 🚀 LinkX: Building a Network, Not a Directory
> **Track 1:** Alumni Network & Professional Connections  
> **Product Vision:** A connected ecosystem connecting Students, Alumni, Faculty, Founders, Recruiters, and Institutions based on **Proof-of-Capability**, **Intent Alignment**, and **Measurable Outcomes**.

---

## 🌟 Executive Summary & Key Capabilities

LinkX transforms traditional, inactive college alumni directories into a real-time, AI-powered professional ecosystem. Instead of cold-DM spam and static profile resumes, LinkX operates on verifiable proof-of-work, multi-hop consent introductions, interactive simulation assessments, and economic micro-bounties.

### Supported Personas & Role Ecosystem:
1. **🎓 Student:** Dynamic 4-Phase Career Missions, Opportunity Rescue contingency pivot engine, Career Shadow AI interactive simulations, and Holistic Proof-of-Capability scoring (Resume ATS + GitHub Code Readiness + Skills Depth + Academics).
2. **💼 Alumnus:** 1-Click ATS Referral Queue, Alumni Impact Exchange with structured 1:1 mentorship booking, and Alumni Legacy Graph for authoring technical playbooks.
3. **🚀 Founder:** Micro-Bounty Exchange (escrow-backed ₹3,000–₹12,000 sprint bounties) to hire high-performing student builders with verified pull requests in 48 hours.
4. **🏛️ Faculty:** Faculty Challenge Exchange for sponsored industry capstone projects, cross-disciplinary squad team matching, and co-guided IEEE research.
5. **🎯 Founder / Recruiter:** Natural Language Hiring Copilot extracting technical requirements, ranked Proof-of-Work shortlists with dynamic match percentages, fast-track interview invitations, and downloadable CSV exports.
6. **🏫 Institution Administrator:** Opportunity Gap Radar, real-time alumni velocity metrics, industry skill gap heatmaps, and economic bounty disbursement analytics.

---

## 🎨 Three User-Selectable Themes (Non-Negotiable)

LinkX features three full-fidelity, accessible, and persistent visual themes:

1. **Light Theme (`.theme-light`):**
   - Clean slate-50 light background (`#f8fafc`).
   - Deep readable slate-900 typography (`#0f172a`).
   - Crisp bordered cards with soft shadows and high-contrast accessible form elements.
2. **Dark Theme (`.theme-dark`):**
   - Deep obsidian background (`#030712`) with rich midnight navy cards (`#0a0f1d`).
   - Neon indigo and emerald accents with accessible contrast ratios.
   - Ideal for engineering focus and night workflows.
3. **Hybrid Theme (`.theme-hybrid` - Mixed Light & Dark):**
   - **Dark Top Navigation & App Bars:** Deep slate-950 (`#020617` / `#060a14`) with bright white branding and badges.
   - **Light Content Surfaces:** High-readability white and light-gray canvas (`#f1f5f9` / `#ffffff`) with dark text (`#0f172a`).
   - Balances modern high-tech SaaS branding with daytime document readability.

*Theme Persistence:* Theme selections persist across browser sessions in `localStorage` under key `'linkx_theme'` and automatically synchronize with the user's backend profile settings via `/api/auth/settings`. An inline bootstrap script executes in `<head>` to prevent theme flashes on page reload.

---

## 🔒 Security & Authentication Architecture

- **Password Security:** Cryptographically secure PBKDF2 (`crypto.pbkdf2Sync`) with 100,000 iterations, unique 16-byte cryptographically random hex salts, and SHA-512 hashing.
- **Session Management:** Secure token-based sessions with 7-day expiration and automatic session invalidation on logout.
- **Access Control:** Server-side role-based and resource-level authorization. Sensitive actions (referrals, squad evaluations, settings updates) require verified authorization tokens.
- **Atomic Persistence:** Synced JSON data persistence with atomic file writes preventing race conditions and database corruption.
- **Credential Hygiene:** No hardcoded secrets. Environment variables documented in `.env.example`.

---

## 🏗️ Technology Stack

- **Frontend:** HTML5, Modern Vanilla JavaScript (ES2022 Modules), Tailwind CSS, Lucide Icons, Canvas 2D Physics Topology Graphs, Chart/Radar telemetry visualizations.
- **Backend:** Node.js (v24 LTS), Express.js REST API, modular feature controllers (`server/controllers/`).
- **Database:** Atomic synchronized JSON document store (`data/db.json`) with automated pre-mutation backups.
- **AI Integrations:** Optional Google Gemini API integration (`server/services/aiService.js`) with production-grade heuristic fallback analyzers.
- **Testing:** Native Node.js test runner (`node:test` and `node:assert/strict`).

---

## 📁 System Architecture & Directory Layout

```
.
├── .env.example                          # Environment variable configuration template
├── package.json                          # Dependencies & NPM scripts (dev, test, start)
├── server.js                             # Express HTTP REST engine & route handlers
├── app.js                                # Frontend SPA router, view renderers, and state
├── index.html                            # Master responsive UI with theme tokens & modals
├── data/
│   └── db.json                           # Canonical atomic database store
├── server/
│   ├── controllers/
│   │   ├── authController.js             # PBKDF2 hashing, login, register, reset, settings
│   │   ├── missionController.js          # 4-phase career missions & opportunity rescue
│   │   ├── shadowController.js           # Career Shadow simulations & scoring rubrics
│   │   ├── bridgeController.js           # Hidden Bridge Finder multi-hop intro paths
│   │   ├── legacyController.js           # Alumni Legacy Graph knowledge base & upvoting
│   │   ├── challengeController.js        # Faculty capstones & squad team applications
│   │   ├── recruiterController.js        # NLP Hiring Copilot & CSV candidate export
│   │   └── communicationController.js    # Notifications, messaging & Gap Radar
│   └── services/
│       ├── aiService.js                  # Gemini AI integration & heuristic fallbacks
│       └── githubService.js              # GitHub API repository telemetry analyzer
└── test/
    └── api.test.js                       # Comprehensive 29-test end-to-end integration suite
```

---

## ⚡ Quick Start & Setup Guide

### 1. Prerequisites
- Node.js version 18 or higher (Node.js v24 recommended).
- Git.

### 2. Installation
```bash
# Clone or navigate to the project directory
cd Hackshift-GenX-AI-

# Install project dependencies
npm install

# Setup environment configuration
cp .env.example .env
```

### 3. Run the Full-Stack Application
```bash
# Start the LinkX Engine (Serves frontend and API at port 3000)
npm start

# Or run with hot-reload watch mode during development:
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Automated Test Suite

LinkX includes an end-to-end automated integration test suite covering all platform layers and API endpoints:

```bash
npm test
```

### Verified Test Coverage (39 / 39 Passing):
- **Authentication & Security:** Registration, login, bad credential rejection, session validation (`/api/auth/me`), theme persistence (`/api/auth/settings`), forgot password, and reset password.
- **Student Mission Engine:** 4-phase goal-to-referral roadmap, milestone task toggling, and Opportunity Rescue contingency pivot calculation.
- **Career Shadow Simulations:** Scenario track listings, multi-stage response grading, and transparent rubric breakdowns.
- **Hidden Bridge Finder:** Multi-hop path discovery with confidence scores, mutual connectors, and consent-based intro workflows.
- **Alumni Mentorship Exchange:** Mentor slot discovery, session booking, and session completion with feedback ratings.
- **Alumni Legacy Graph:** Knowledge resource creation, tagged filtering, and reputation upvoting.
- **Faculty Panel (Separated & Dedicated):** Capstone challenge exchange, student talent dossiers with capability scores, capstone milestone review and scoring, alumni co-guide invitations, and faculty research profile management.
- **Institution Panel (Separated & Dedicated):** University-wide macro metrics, placement intelligence & sector demand radar, academic department management, NAAC Criterion V & NIRF outcomes CSV export, and governance security audit logging with strict RBAC enforcement (403 for unauthorized roles).
- **Recruiter Hiring Copilot:** Natural language criteria extraction, candidate shortlist generation, fast-track interview dispatch, and downloadable CSV exports.
- **Institution Gap Radar:** Real-time skill gap analysis, alumni velocity metrics, and recommended interventions.
- **Messaging & Notifications:** Unread notification delivery, bulk mark-read, conversation threads, and structured message dispatch.

---

## 🌐 Complete API Contract Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/personas` | Returns active personas and verified network roles |
| `GET` | `/api/analytics` | Returns aggregate platform statistics and KPIs |
| `POST` | `/api/auth/register` | Creates a new account with PBKDF2 password salt/hash |
| `POST` | `/api/auth/login` | Authenticates credentials and returns session token |
| `GET` | `/api/auth/me` | Returns current user profile with Bearer session token |
| `POST` | `/api/auth/logout` | Invalidates active user session |
| `POST` | `/api/auth/forgot-password` | Dispatches password reset token |
| `POST` | `/api/auth/reset-password` | Validates reset token and sets new password |
| `POST` / `PATCH` | `/api/auth/settings` | Updates user theme (`light`, `dark`, `hybrid`) and privacy |
| `GET` | `/api/student/missions` | Fetches active 4-phase career roadmap |
| `POST` | `/api/student/missions` | Generates a new goal-driven career mission |
| `POST` | `/api/student/missions/tasks/toggle` | Toggles mission task completion status |
| `POST` | `/api/student/opportunity-rescue` | Generates 3 contingency pivot branches for missed targets |
| `GET` | `/api/career-shadow/scenarios` | Lists simulation tracks (Tech, Architecture, Incident) |
| `POST` | `/api/career-shadow/evaluate` | Evaluates response with transparent scoring and rubric |
| `GET` | `/api/bridge/paths` | Discovers multi-step connection paths to target companies |
| `POST` | `/api/bridge/request` | Submits consent-based introduction request |
| `POST` | `/api/bridge/status` | Updates introduction status (`approved`, `declined`) |
| `GET` | `/api/alumni/mentorship/slots` | Lists available alumni mentoring slots |
| `POST` | `/api/alumni/mentorship/book` | Books a 1:1 mentorship guidance session |
| `POST` | `/api/alumni/mentorship/status` | Updates session status (`confirmed`, `completed`) |
| `GET` | `/api/legacy-graph` | Searches technical playbooks and career retrospectives |
| `POST` | `/api/legacy-graph/posts` | Authors a new legacy knowledge resource |
| `POST` | `/api/legacy-graph/upvote` | Increments reputation votes on a legacy post |
| `GET` | `/api/faculty/dashboard` | Returns faculty teaching KPIs, active supervisions & deadlines |
| `GET` | `/api/faculty/students` | Returns student talent dossiers with capability scores & GitHub proof |
| `GET` | `/api/faculty/supervision` | Returns supervised student squads and capstone milestones |
| `POST` | `/api/faculty/supervision/review` | Evaluates, scores, and grades student capstone milestone |
| `GET` | `/api/faculty/collaborations` | Lists industry & alumni co-guide partnerships |
| `POST` | `/api/faculty/collaborations/invite` | Invites alumni co-guide to co-mentor student squad |
| `GET` / `PUT` | `/api/faculty/profile` | Updates faculty research domains, office hours & squad capacity |
| `GET` | `/api/faculty/challenges` | Lists sponsored and faculty capstone challenges |
| `POST` | `/api/faculty/challenges` | Creates a new capstone research challenge |
| `POST` | `/api/faculty/challenges/apply` | Submits cross-disciplinary squad team application |
| `GET` | `/api/institution/overview` | Executive university-wide metrics, top recruiters & verified outcomes |
| `GET` | `/api/institution/intelligence` | Real-time sector hiring demand & underserved department alerts |
| `GET` | `/api/institution/departments` | Lists all academic departments and cohort placement targets |
| `POST` | `/api/institution/departments` | Creates academic department (Protected by 403 RBAC) |
| `DELETE` | `/api/institution/departments/:id` | Removes academic department (Protected by 403 RBAC) |
| `GET` | `/api/institution/outcomes` | Accreditation report for NAAC Criterion V & NIRF metrics |
| `GET` | `/api/institution/export-outcomes-csv` | Generates official compliance CSV download |
| `GET` / `POST` | `/api/institution/governance` | University domain policy, scrape lock & audit log viewer |
| `GET` | `/api/institution/audit-logs` | Cryptographic security audit log stream (Protected by 403 RBAC) |
| `POST` | `/api/recruiter/copilot` | Extracts hiring criteria and ranks candidate shortlist |
| `GET` / `POST` | `/api/recruiter/export-csv` | Exports candidate proof-of-work shortlist as CSV |
| `POST` | `/api/recruiter/invite` | Dispatches fast-track interview invitation |
| `GET` | `/api/institution/gap-radar` | Returns institutional skill gap radar & alumni destinations |
| `GET` | `/api/notifications` | Returns context-aware user notifications |
| `POST` | `/api/notifications/mark-read` | Marks notification(s) as read |
| `GET` | `/api/messages/conversations` | Returns structured direct conversation threads |
| `POST` | `/api/messages/send` | Dispatches message within conversation thread |

---

## 🏆 Demonstration Walkthrough (Judging Highlights)

1. **Theme Switcher:** Use the theme selector in the top bar to switch between **Light**, **Dark**, and **Hybrid** modes. Notice how Hybrid preserves a high-tech dark navigation bar while presenting clean light content surfaces. Refresh the page—theme selection persists with zero page flash.
2. **Contextual Single Back Navigation:** Notice there are no duplicate Back buttons in footers, mobile corners, or status bars. Exactly one clean Back button is pinned to the header alongside real-time dynamic breadcrumbs (`[Portal] > [Active Tab]`). Clicking Back pops previous tabs within the in-app history without accidental logout!
3. **Dedicated Faculty Panel:** Authenticate as Faculty (Dr. R.K. Verma). Access the **Faculty Dashboard**, browse the **Student Talent Roster**, inspect verified GitHub repositories, grade and review submitted milestones in **Supervision & Reviews**, and invite alumni co-guides under **Alumni Co-Guides**.
4. **Dedicated Institution Command Desk:** Authenticate as Institution Admin (Dean Sharma). Access **Executive Overview**, review real-time tech stack signals under **Placement Intelligence**, manage academic units in **Department Quotas**, download official outcomes via **Accreditation & Outcomes CSV**, and manage campus security policies in **Governance & Audits**. Non-admin attempts to access administration endpoints are blocked with HTTP 403 Forbidden.
5. **Student Proof-of-Work & Missions:** Navigate to **Student Capability** to see the 4-Phase Career Mission, ATS resume score, and GitHub verification metrics. Click **Opportunity Rescue** to see 3 automated pivot paths generated when a target role closes.
6. **Career Shadow AI:** Select **Career Shadow** and enter the *High-Throughput Order Ingestion* scenario. Select architecture options to view instant rubric scoring and transparent senior-engineering feedback.
7. **Hidden Bridge Finder:** Navigate to **Bridge Finder** and view the 3-hop connection path connecting a student to a Swiggy SDE-2 through faculty capstone lineage. Click **Request Consent-Based Intro**.
8. **Recruiter Copilot:** Open **Hiring Copilot** as a Recruiter. Enter natural language requirements, observe the ranked candidate shortlist, click **Export Shortlist CSV**, and dispatch an interview invitation.

---

## 📄 License & Integrity
LinkX is built for the Hackshift GenX Hackathon (Track 1: Alumni Network & Professional Connections). All rights reserved.

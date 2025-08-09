# Cognito Coding Learning Hub — Project Brief + Plan

## Project Brief
The **Cognito Coding Learning Hub** is a browser-based platform for teaching coding using both visual blocks (Blockly) and real scripts (Lua, Python, JavaScript).  
It is designed for step-by-step learning, structured like Trinket, but supporting Roblox, Python, and other environments.  

**Mission:**  
Deliver a platform that lets students:
- Start with Blockly visual programming
- Convert blocks to real code (Lua, Python, JS)
- Run assignments directly in the browser
- Export work to GitHub for portfolio building

**Core Tech Stack:**
- **Frontend:** React + Vite + Blockly
- **Backend:** FastAPI (Python)
- **Dev Environment:** GitHub Codespaces + Docker
- **Auth:** GitHub OAuth (Google later)
- **Assignments:** JSON/YAML-driven content from `assignments-library` repo

**Supporting Repos:**
- `cognito-coding-learning-hub` — main platform (frontend + backend)
- `assignments-library` — assignment templates
- `blockly-engine` — custom Blockly blocks + code generators
- `hub-docs` — developer and educator documentation

**Hosting:**  
Custom domain (`cognitocoding.com`) via Njalla, backend hosted on cloud provider (TBD).

---

## Project Plan — Current Milestones

### ✅ Day 1: Foundation Decisions
- Domain, DNS, and email setup
- GitHub org and repos created
- Initial project plan drafted

### ✅ Day 2: Foundation Build
- **Codespaces setup** with Node 20 + Python 3.11
- **Frontend scaffold** with Vite + React
- **Blockly workspace** on `/playground`
- **Backend scaffold** with FastAPI + `/ping` route
- **Auth skeleton** with GitHub OAuth stubs
- **Assignments API** serving static JSON
- **Docker Compose** for running frontend + backend together
- Verified all supporting repos exist

### ⏩ Day 3: Code Generation + UI Integration
1. Add Lua + Python code generation buttons to `/playground`.
2. Output generated code to console (later to file or execution panel).
3. Style Blockly workspace and toolbox to match branding.
4. Expand Assignments API to return categories and metadata.
5. Begin linking assignments to frontend for dynamic loading.

### 🔜 Day 4+: User Workflow
- Complete GitHub OAuth flow.
- Add student dashboard and assignment runner.
- Implement GitHub export for student code.
- Add educator/admin tools for creating assignments.

---

## End Goal
A hosted, self-contained coding learning hub where:
- New students can log in with GitHub/Google.
- Teachers can create and assign Blockly + code-based tasks.
- Students can code in Blockly or scripts, run code, and export work.
- Supports Python, Lua (Roblox), and JavaScript output.

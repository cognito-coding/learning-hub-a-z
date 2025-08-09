# Cognito Coding Learning Hub — Project Plan (with Official UI)

## ✅ Day 1 — Foundation Decisions
- Domain, DNS, and email setup  
- GitHub org and repos created  
- Initial project plan drafted  

---

## ✅ Day 2 — Foundation Build
- **Codespaces setup** with Node 20 + Python 3.11  
- **Frontend scaffold** with Vite + React  
- **Blockly workspace** on `/playground`  
- **Backend scaffold** with FastAPI + `/ping` route  
- **Auth skeleton** with GitHub OAuth stubs  
- **Assignments API** serving static JSON  
- **Docker Compose** for running frontend + backend together  
- Verified all supporting repos exist  

---

## ⏩ Day 3 — Code Generation + UI Integration *(In Progress)*

**Step 1 — Lua + Python code generation buttons** ✅  
**Step 2 — Output generated code to console** ✅  
**Step 3 — Style Blockly workspace & toolbox to match branding** *(Current)*  
- Use **official Cognito Coding Learning Hub UI** (see Reference UI section)  
- Apply brand theme tokens (colors, font, spacing)  
- Ensure responsive layout for desktop and tablet  

**Step 4 — Expand Assignments API**  
- Add categories, difficulty, language, and metadata fields  
- Ensure JSON schema is validated  

**Step 5 — Begin linking assignments to frontend**  
- Dynamic loading from API  
- Fallback UI for missing fields  

---

## 🔜 Day 4 — User Workflow
- Complete GitHub OAuth flow (frontend → backend)  
- Student dashboard with “My Assignments” view  
- Assignment runner page (instructions + editor + run button)  
- GitHub export for student code submissions  

---

## 📌 Reference UI — Official Design
*(Preserve as-is unless Zero explicitly approves changes)*  

**Layout:**
- **Left Panel**:  
  - Assignment title + category dropdown  
  - Instructions + navigation buttons (Prev/Next)  
- **Center Panel**: Blockly workspace with toolbox (Logic, Loops, Math, Text, Lists, Colour, Variables, Functions)  
- **Right Panel**: Code preview pane (language-specific, e.g., Python 3 runtime ready)  
- **Bottom Panel**: Black console-style area for generated code output  

**Color Theme:**
- Brand orange header + accents  
- Soft peach background for workspace areas  
- Muted category colors for Blockly  
- Light blue code preview panel  
- Black terminal output panel  

---

## 📈 Post-Day 4 Milestones

**Milestone 1 — MVP Completion (Target: September)**  
- Blockly toggle between block mode and code mode  
- Assignment progress tracking per user  
- Fully functional Lua + Python runners in browser  
- Educator dashboard (light) to assign and monitor tasks  
- Hosted production build (Vercel frontend + Railway/Fly.io backend)  

**Milestone 2 — Phase 2 Enhancements**  
- Roblox Studio plugin for real-game testing  
- Assignment creation UI for teachers  
- Real-time code feedback + AI hinting  
- Gamification system (badges, levels, XP)  
- Security-based coding track (CTFs, validation challenges)  
- Group/classroom management views  

# 🧱 System Blueprint: "Roblox Code Trainer"

## 1. Frontend (Web App)
**Purpose:** Where students write code, follow lessons, and run tests.  
**Built with:** Vue 3 + Monaco Editor

**Features:**
- Step-by-step coding assignments
- Code editor (Lua syntax)
- “Run / Check” buttons
- Feedback area
- Progress tracker

---

## 2. Backend API
**Purpose:** Delivers assignments, stores progress, handles testing.  
**Built with:** FastAPI (Python) or Node/Express

**Routes:**
- `GET /assignments/:id`
- `POST /submit`
- `GET /user/:id/progress`

**Optional:** Lua code validation, test execution, auth

---

## 3. Database
**Purpose:** Store users, assignment steps, progress logs  
**Use:** PostgreSQL (hosted via Supabase or Railway)

**Tables:**
- `users` (email, role, login)
- `assignments` (title, steps, code scaffold, test cases)
- `progress` (user_id, assignment_id, step_id, complete)

---

## 4. Execution Layer
**Two options:**

**A. Mock Runner (Web)**
- Simulate Roblox Lua behavior in JS (e.g. input/output, event calls)
- Basic print() and logic testing

**B. Studio Plugin Bridge**
- Pull user code into a locked-down test place
- Run inside actual Roblox engine
- Use custom tests to validate behavior (like sprint mechanic)

---

## 5. Teacher Tools (Later)
- Dashboard to create/edit assignments
- Class code sharing
- Progress exports (CSV / dashboard)

---

## 🎯 Milestone Plan (Slow Burn)

| Phase | Focus |
|-------|-------|
| ✅ 0. Planning | Lock goals, stack, timeline |
| 1 | Frontend scaffold — Monaco editor, assignment viewer |
| 2 | Backend API scaffold — Serve assignment data, log progress |
| 3 | Code runner v1 — Basic JS Lua interpreter or runner |
| 4 | Auth + tracking — Login, save progress |
| 5 | Studio plugin bridge — Real-world testing path |
| 6 | Teacher dashboard — Assignment creation + class views |
| 7 | Deploy + test — Host on Vercel + Railway |

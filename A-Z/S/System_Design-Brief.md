# 🧱 Platform Design Brief: LearnHub (Codename)

## 🎯 Goal
Build a single, unified, web-based coding education platform to replace the fractured workflow of Scratch, Trinket, Roblox Studio, CodeMonkey, and Replit.

✅ One login  
✅ One learning flow  
✅ All coding levels  
✅ Fully teacher-controlled  
✅ Portfolio-ready  

---

## 🧠 Core Features

| Area | Description |
|------|-------------|
| Structured Assignments | Step-by-step lessons with code editor, hints, and testable goals |
| Multi-Language Support | Lua, Python, JavaScript (via Monaco editor + runners) |
| Blockly Support | Optional visual block-based editor that exports to code |
| Progress Tracking | Per-user step + assignment tracking |
| GitHub Portfolio Export | One-click push to GitHub repo per assignment |
| Clean Classroom UX | Distraction-free — no Marketplace, no drag/drop chaos |
| Optional Roblox Studio Plugin | (Phase 2) Real-game test environment bridge |
| Future Add-ons | Security labs, CTFs, gamification, feedback tools |

---

## 🛠️ Tech Stack

| Component | Stack |
|-----------|-------|
| Frontend | Vue 3 + Vite + Monaco Editor + Blockly |
| Backend | FastAPI (Python) or Node/Express |
| Database | PostgreSQL (via Supabase or Docker) |
| Runners | JS-native eval (JS), Fengari (Lua in browser), Pyodide or Skulpt (Python) |
| Auth | Supabase Auth or GitHub OAuth |
| Deployment | Vercel (frontend), Railway or Fly.io (backend) |
| Dev Environment | GitHub Codespaces + Docker Compose |

---

## 📦 App Structure (File Layout)
```
/learnhub-platform/
├── frontend/           # Vue 3 app (Monaco + Blockly)
├── backend/            # API (FastAPI or Node)
├── runners/            # Language VMs for browser execution
├── assignments/        # JSON or DB-driven lessons
├── plugin/             # (Optional) Roblox Studio plugin
├── devcontainer.json   # GitHub Codespaces config
├── docker-compose.yml  # Full stack boot
```

---

## 📚 Assignment Format (Schema)
Each assignment:
- Has multiple steps
- Can be code-based or block-based
- Includes:
  - `title`
  - `instructions`
  - `starter_code` or `starter_blocks`
  - `language` (lua, python, js)
  - `test_case` logic or output
  - `hints`
  - `is_block_mode` flag

---

## 🧪 MVP Scope (Ready by September)

| Feature | Status |
|---------|--------|
| Vue + Monaco editor | ✅ Build in progress |
| Assignment viewer + loader | ✅ MVP priority |
| Lua + Python runner | ✅ Buildable via Fengari + Pyodide |
| Blockly embed + toggle | ✅ Design-in, build post-MVP |
| Auth + student progress | ✅ Essential |
| GitHub export | ✅ MVP feature |
| Studio plugin | ❌ Optional, post-MVP |
| Admin/Teacher dashboard | ✅ Light version in MVP |

---

## 🎯 Stretch Goals (Phase 2+)
- Roblox Studio plugin for code sync
- Assignment creation UI for teachers
- Real-time code feedback + AI hinting
- Security-based coding track (CTFs, hashing, validation)
- Gamification: badges, levels, XP
- Group/classroom views

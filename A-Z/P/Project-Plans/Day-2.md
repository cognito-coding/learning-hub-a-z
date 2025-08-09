# Cognito Coding Learning Hub — Project Plan
## Day 2 — Foundation Build

**Goal:** Get a working *empty shell* of Cognito Coding Learning Hub running locally and via Codespaces, with enough structure to start plugging in features.

---

## 1. Repo & Project Structure
**Target:** Create initial directories + base files for the main repo `cognito-learning-hub`.

```
cognito-learning-hub/
│
├── frontend/            # React + Blockly UI
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── blockly/     # Blockly integration code
│   │   └── index.js
│   ├── package.json
│   └── vite.config.js   # Prefer Vite for speed
│
├── backend/             # Python FastAPI service
│   ├── main.py
│   ├── routes/
│   ├── models/
│   ├── requirements.txt
│   └── Dockerfile
│
├── shared/              # Shared config, types, constants
│
├── docker-compose.yml
├── .devcontainer/       # Codespaces setup
├── README.md
└── LICENSE
```

---

## 2. Tech Stack Decisions
- **Frontend:** React + Vite (faster dev cycle than CRA)
- **Backend:** FastAPI (async, clean docs, good for JSON/YAML APIs)
- **Blockly Integration:** Use `blockly` npm package, custom Lua generator
- **Storage:** Local JSON/YAML in `assignments-library` repo; load via API

---

## 3. Codespaces + Docker Setup
**Goals today:**
- Base `docker-compose.yml` for frontend + backend
- `.devcontainer/devcontainer.json` for Codespaces with Node + Python preinstalled
- Hot reload enabled for both

---

## 4. Auth Skeleton
- GitHub OAuth app setup in developer settings
- Backend `/auth/github` endpoint stub (no DB yet)
- Store session in memory for now

---

## 5. Assignment Loader API
- Backend endpoint `/assignments` returns JSON from `assignments-library` repo
- Just a static load at first (no DB or auth required yet)

---

## 6. Initial Blockly Embed
- Static React page `/playground`
- Load Blockly workspace
- Test Lua + Python export (console log output only for now)

---

## 7. Repo Coordination
- Initialize empty repos for `assignments-library`, `blockly-engine`, and `hub-docs`
- Link as submodules or fetch via API

---

**📌 Day 2 Win Condition:**  
Complete **Steps 1–4** for a functional “hello world” hub:  
- GitHub login stub  
- Blockly visible in browser  

**📌 Day 3 Goal Preview:**  
Begin building custom blocks + assignment runner.

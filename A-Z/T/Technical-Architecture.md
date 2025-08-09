# Technical Architecture

**Frontend:** Vue 3 + Vite + Monaco Editor + Blockly  
**Backend:** FastAPI (Python) or Node/Express  
**Database:** PostgreSQL (Supabase or Docker)  
**Runners:**  
- JavaScript → Native eval  
- Lua → Fengari  
- Python → Pyodide/Skulpt  

**Auth:** Supabase Auth or GitHub OAuth  
**Hosting:**  
- Frontend → Vercel  
- Backend → Railway or Fly.io  
- Database → Supabase or Railway  

**Dev Environment:** GitHub Codespaces with Docker Compose

## Repo Structure
```
/learnhub-platform/
├── frontend/           # Vue + Monaco + Blockly
├── backend/            # FastAPI or Node API
├── runners/            # Language VMs
├── assignments/        # JSON/DB-driven lessons
├── plugin/             # Roblox Studio plugin (Phase 2)
├── devcontainer.json   # Codespaces config
├── docker-compose.yml  # Full stack dev control
```

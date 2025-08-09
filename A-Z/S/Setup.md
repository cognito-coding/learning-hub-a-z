# ✅ What We Can Build in Codespaces

| Module                  | Codespaces Capable? | Notes                                      |
|-------------------------|---------------------|--------------------------------------------|
| Web IDE (Vue + Monaco)  | ✅                  | Run Vite dev server, forward port 5173     |
| Backend (FastAPI/Node)  | ✅                  | Run on port 8000 or 3000                   |
| Database (Postgres)     | ✅                  | Docker container inside Codespace          |
| Plugin Code Delivery    | ✅                  | Serve `.lua` files via backend route       |
| Full Docker Compose     | ✅                  | Single `docker-compose up` to spin the whole stack |

---

## Example Dev Flow in Codespaces
1. Clone your repo  
2. Open in Codespaces (with `devcontainer.json`)  
3. Auto-launch:  
   - **frontend** on port `5173`  
   - **backend** on port `8000`  
   - **postgres** on local docker network  
4. Start writing assignments, test IDE, plugin, etc.

---

## Bonus: Devcontainer Setup
Your `devcontainer.json` would define:
- Ubuntu + Docker  
- Node, Python, Postgres tools  
- Auto-run services on container launch  

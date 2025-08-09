# Vite — Frontend Build Tool

## Context in Cognito Coding Learning Hub
Vite is the build tool and development server we use for the **frontend** of the Learning Hub.  
It’s responsible for starting the React UI quickly, serving files during development, and bundling the code for production.

---

## Why Vite?
- **Fast startup:** Uses native ES modules in the browser so dev server starts instantly.
- **Hot reload:** Save a file → Browser updates instantly without a full page reload.
- **On-demand builds:** Only compiles the code needed for the page you’re viewing.
- **Lightweight in Codespaces:** Uses less CPU and memory than older tools like Webpack.

---

## How We Used It (Day 2)
1. Installed Vite + React template in the `frontend/` directory.
2. Started the dev server inside GitHub Codespaces.
3. Confirmed React welcome page was visible on **Port 5173**.

Command run:

```bash
cd /workspaces/cognito-coding-learning-hub && npm create vite@latest frontend -- --template react && cd frontend && npm install && npm run dev
```

---

## Result
- Frontend server live at **localhost:5173** (in Codespaces: via Ports tab → Open in Browser).
- React app is now ready for integrating Blockly and our custom UI components.

# GitHub Codespaces — Cloud Development Environment

## Context in Cognito Coding Learning Hub
GitHub Codespaces provides a **full development environment in the cloud**, directly inside a browser or VS Code.  
For the Learning Hub, we use Codespaces so the development setup is **identical for everyone** and requires no local installation beyond a browser.

---

## Why Codespaces?
- **Consistent environment:** Everyone gets the same OS, Node, Python versions, and tools.
- **No local setup headaches:** Works from anywhere with only a browser.
- **Integrated with GitHub:** Directly tied to our repositories.
- **Port forwarding:** Allows running both frontend and backend servers in the same space.

---

## How We Used It (Day 2)
1. Enabled Codespaces for the GitHub organization.
2. Added `.devcontainer/devcontainer.json` with:
   - Ubuntu base image
   - Node.js 20
   - Python 3.11
   - Git preinstalled
   - Forwarded ports for frontend (5173) and backend (8000)
3. Opened a new Codespace from the repository:
   - **Code** → **Codespaces** → **Create codespace on main**
4. Ran environment sanity checks:
```bash
node -v
python --version
which python
python -m venv .venv
source .venv/bin/activate
pip --version
```

---

## Result
- Cloud dev environment ready in under 5 minutes.
- All required languages and tools installed automatically.
- Ready to run the Learning Hub frontend and backend without local installs.

---

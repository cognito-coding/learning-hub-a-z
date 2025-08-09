Step — Add GitHub OAuth stub to backend

In your backend folder, make a new file:

### backend/routes/auth.py

from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/github")
def github_login():
    # TODO: Redirect to GitHub OAuth authorize URL
    return {"message": "GitHub OAuth start - not yet implemented"}

@router.get("/github/callback")
def github_callback(code: str):
    # TODO: Exchange code for access token, fetch user data
    return {"message": "GitHub OAuth callback - not yet implemented", "code": code}

### Update backend/main.py to register the route:

# at repo root in your Codespace
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import auth, assignments

app = FastAPI(title="Cognito Coding Learning Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(assignments.router)

@app.get("/ping")
def ping():
    return {"status": "ok"}




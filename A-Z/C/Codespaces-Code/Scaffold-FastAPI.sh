cd /workspaces/cognito-coding-learning-hub

# make backend skeleton
mkdir -p backend/routes backend/models
cat > backend/requirements.txt << 'EOF'
fastapi==0.111.0
uvicorn[standard]==0.30.0
pydantic==2.7.1
EOF

# install deps
pip install -r backend/requirements.txt

# main app
cat > backend/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cognito Coding Learning Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"status": "ok"}
EOF

# run the dev server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

# 🛡️ Cybersecurity Modules We Can Embed

## 🔐 1. Code Safety Lessons
Embed directly in assignment steps (across all languages):

| Topic | Example |
|-------|---------|
| Input validation | Python: `input()` vs sanitization |
| Code injection | JS: `"user" + eval()` example |
| Variable scoping / shadowing | Lua or Python — how not to leak values |
| Basic password hashing | Python `hashlib` demo |
| Roblox exploit exposure | Why `RemoteEvents` and client scripts matter |

✅ These go in naturally as part of assignments.

---

## 🔍 2. Security Sandbox / Tool Simulators
Embed lightweight, browser-based tools for safe exploration:

| Tool | Usage |
|------|-------|
| Regex tester | Validate patterns, inputs |
| Base64 / hash encoder | Teach about encoding, not encryption |
| Port scanner sim | Simple “what’s open?” learning tool |
| HTML injection lab | Teach JS XSS basics in sandboxed iframe |

✅ Can all be embedded in lesson sidebars or bonus assignments.

---

## 🧠 3. Secure Coding Track
An optional path in your system — after students learn Lua or Python basics.

Modules:
- What is a CVE?
- Secure function writing
- How websites get hacked (simple)
- Building a login system (and how it breaks)
- Roblox: Safe vs unsafe scripting

---

## 🧰 4. CTF-Style Challenges (Later Phase)
- Embed “capture the flag” puzzles into coding assignments
- Hidden flags in code comments, logic, behavior
- Students learn through discovery

**Example:**
```lua
-- Find the logic bug that leaks this value
local password = "FLAG{something_hidden}"
```

---

## 📦 Bonus Idea: Security Tools as Services
You could even integrate tools like:

| Tool | How |
|------|-----|
| Bandit (Python linter) | Scan student code for flaws before GitHub export |
| ESLint (JS) | Show warnings inline |
| LuaCheck | Warn about unscoped vars, bad globals |

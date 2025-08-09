import React from "react";

export default function PlaygroundLayout({
  brandOrange = "#FF7A00",
  // toolbar
  lang, setLang,
  onGenerate, onRun, canRun, runLabel = "Run",
  onCopy, onClearRun, onClearWorkspace,
  // panels
  runOutput, codeOutput,
  // assignments
  assignment, category, setCategory,
  onPrev, onNext, canPrev, canNext,
  // blockly mount
  blocklyRef,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding: 12,
        display: "grid",
        gridTemplateRows: "auto auto 1fr 28vh",
        gap: 8,
        boxSizing: "border-box",
        background: "#FFF7F0",
      }}
    >
      <header
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "8px 12px", borderRadius: 8,
          background: "#FFF0E3", border: "1px solid #FFD8B5",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: 0.3, color: brandOrange }}>
          Cognito Coding Learning Hub
        </div>
        <div style={{ marginLeft: "auto" }}>
          <a href="mailto:info@cognitocoding.com" style={{ color: brandOrange, textDecoration: "none", fontWeight: 600 }}>
            info@cognitocoding.com
          </a>
        </div>
      </header>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: "8px 10px" }}>
          <option value="python">Python</option>
          <option value="lua">Lua</option>
          <option value="js">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <button onClick={onGenerate}>Generate</button>
        <button onClick={onRun} disabled={!canRun}>{runLabel}</button>
        <button onClick={onCopy}>Copy Code</button>
        <button onClick={onClearRun}>Clear Run</button>
        <button onClick={onClearWorkspace} style={{ marginLeft: "auto" }}>Clear Workspace</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 8, minHeight: 0 }}>
        <aside
          style={{
            border: "1px solid #FFD8B5", borderRadius: 8, background: "#FFF0E3",
            padding: 12, display: "flex", flexDirection: "column", gap: 10, overflow: "auto",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9a5b00" }}>ASSIGNMENT</div>
          <div style={{ fontWeight: 800, lineHeight: 1.2 }}>{assignment?.title || "Untitled"}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{(assignment?.level || "—")} • {category}</div>
          <p style={{ margin: 0 }}>{assignment?.desc || "—"}</p>

          <label style={{ fontSize: 12, marginTop: 6 }}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "6px 8px" }}>
            <option>Intro to Python</option>
            <option>Roblox Lua Basics</option>
            <option>JavaScript Basics</option>
          </select>

          <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
            <button onClick={onPrev} disabled={!canPrev} style={{ flex: 1 }}>◀ Prev</button>
            <button onClick={onNext} disabled={!canNext} style={{ flex: 1 }}>Next ▶</button>
          </div>
        </aside>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, minHeight: 0 }}>
          <div ref={blocklyRef} style={{ width: "100%", height: "100%", border: "1px solid #e9c9a9", borderRadius: 8 }} />
          <pre
            style={{
              margin: 0, padding: 10, background: "#E6F4FF", color: "#0b3a5b",
              border: "1px solid #cfe8ff", borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap",
            }}
          >
            {runOutput}
          </pre>
        </div>
      </div>

      <pre
        style={{
          margin: 0, padding: 10, background: "#1e1e1e", color: "#d4d4d4",
          borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap",
        }}
      >
        {codeOutput}
      </pre>
    </div>
  );
}


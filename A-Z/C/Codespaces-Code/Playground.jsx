// src/Playground.jsx
import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/python";
import "blockly/lua";
import "blockly/javascript";

export default function Playground() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const [lang, setLang] = useState("python"); // python | lua | js | html | css
  const [codeOutput, setCodeOutput] = useState("// Generated code will appear here");
  const [runOutput, setRunOutput] = useState("// Run output will appear here");

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Pastel theme (pale orange workspace)
    const PastelTheme = Blockly.Theme.defineTheme("cognitoPastel", {
      base: Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: "#FFEBD6", // pale pastel orange
        toolboxBackgroundColour: "#FFF7F0",
        toolboxForegroundColour: "#334155",
        flyoutBackgroundColour: "#FFF7F0",
        flyoutOpacity: 0.98,
        scrollbarColour: "#c7c7c7",
        insertionMarkerColour: "#60a5fa",
        insertionMarkerOpacity: 0.6,
        cursorColour: "#60a5fa",
        markerColour: "#60a5fa",
        selectedGlowColour: "#60a5fa",
        selectedGlowSize: 2
      }
    });

    const toolboxXml = `
      <xml id="toolbox">
        <category name="Logic" categorystyle="logic_category">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
        </category>
        <category name="Math" categorystyle="math_category">
          <block type="math_number"><field name="NUM">0</field></block>
          <block type="math_arithmetic"></block>
        </category>
        <category name="Text" categorystyle="text_category">
          <block type="text_print"></block>
          <block type="text"></block>
        </category>
      </xml>
    `;

    const ws = Blockly.inject(blocklyDiv.current, {
      theme: PastelTheme,
      toolbox: Blockly.utils.xml.textToDom(toolboxXml),
      zoom: { controls: true, wheel: true },
      renderer: "thrasos",
      move: { scrollbars: true, drag: true, wheel: true },
      trashcan: true,
    });
    workspaceRef.current = ws;

    // starter block
    const startXml = `
      <xml xmlns="https://developers.google.com/blockly/xml">
        <block type="text_print" x="40" y="40">
          <value name="TEXT">
            <block type="text"><field name="TEXT">Hello Cognito!</field></block>
          </value>
        </block>
      </xml>
    `;
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(startXml), ws);

    // resize handling
    const resize = () => Blockly.svgResize(ws);
    requestAnimationFrame(resize);
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(blocklyDiv.current);

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      ws.dispose();
    };
  }, []);

  function generate() {
    if (!workspaceRef.current) return;
    let code = "";

    if (lang === "python") code = Blockly.Python.workspaceToCode(workspaceRef.current);
    if (lang === "lua")    code = Blockly.Lua.workspaceToCode(workspaceRef.current);
    if (lang === "js")     code = Blockly.JavaScript.workspaceToCode(workspaceRef.current);

    // HTML/CSS stubs until we add real blocks/generators
    if (lang === "html") {
      code =
`<!-- TODO: HTML generator -->
<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Cognito</title></head>
  <body>
    <!-- convert blocks to HTML here -->
  </body>
</html>`;
    }
    if (lang === "css") {
      code =
`/* TODO: CSS generator */
body {
  font-family: system-ui, sans-serif;
}`;
    }

    setCodeOutput(code || "// (empty)");
    console.clear();
    console.log(`[${lang}] generated:\n` + code);
  }

  function runCode() {
    // For now we only plan to execute Python (Pyodide). Others will be no-op.
    if (lang !== "python") {
      setRunOutput(`// Run not available for '${lang}' yet`);
      return;
    }
    setRunOutput(">>> Running (Python)...\n// execution not wired yet");
  }

  function copyCode() {
    navigator.clipboard.writeText(codeOutput || "");
  }
  function clearRun() { setRunOutput("// Run output will appear here"); }
  function clearWorkspace() { workspaceRef.current?.clear(); }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding: 12,
        display: "grid",
        gridTemplateRows: "auto 1fr 28vh", // toolbar, top row, code row
        gap: 8,
        boxSizing: "border-box",
        background: "#FFF7F0" // soft background around everything
      }}
    >
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: "8px 10px" }}>
          <option value="python">Python</option>
          <option value="lua">Lua</option>
          <option value="js">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <button onClick={generate}>Generate</button>
        <button onClick={runCode}>Run</button>
        <button onClick={copyCode}>Copy Code</button>
        <button onClick={clearRun}>Clear Run</button>
        <button onClick={clearWorkspace} style={{ marginLeft: "auto" }}>Clear Workspace</button>
      </div>

      {/* TOP ROW: Blockly (left) + Run output (right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 8,
          minHeight: 0,
        }}
      >
        <div
          ref={blocklyDiv}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #e9c9a9",
            borderRadius: 8,
            // workspace fill is controlled by the theme (pale orange)
          }}
        />
        <pre
          style={{
            margin: 0,
            padding: 10,
            background: "#E6F4FF",   // pastel light blue
            color: "#0b3a5b",
            border: "1px solid #cfe8ff",
            borderRadius: 8,
            overflow: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {runOutput}
        </pre>
      </div>

      {/* BOTTOM ROW: Code output full width */}
      <pre
        style={{
          margin: 0,
          padding: 10,
          background: "#1e1e1e",
          color: "#d4d4d4",
          borderRadius: 8,
          overflow: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {codeOutput}
      </pre>
    </div>
  );
}

}



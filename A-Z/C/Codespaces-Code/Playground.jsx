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
  const pyodideRef = useRef(null);

  // UI state
  const [lang, setLang] = useState("python"); // python | lua | js | html | css
  const [codeOutput, setCodeOutput] = useState("// Generated code will appear here");
  const [runOutput, setRunOutput] = useState("// Run output will appear here");
  const [pyStatus, setPyStatus] = useState("idle"); // idle | loading | ready | error
  const [isRunning, setIsRunning] = useState(false);

  // Sidebar (stubbed assignments for now)
  const [category, setCategory] = useState("Intro to Python");
  const assignments = [
    { id: "ap-hello", title: "Hello World (Python)", level: "Beginner", desc: "Use a print block to say hello." },
    { id: "ap-vars", title: "Variables + Print", level: "Beginner", desc: "Create a variable and print it." },
    { id: "al-print", title: "Printing in Lua", level: "Beginner", desc: "Use print() in Lua." }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = assignments[currentIndex];

  useEffect(() => {
    if (!blocklyDiv.current) return;

    const brandOrange = "#FF7A00";

    // Theme (pale pastel orange)
    const PastelTheme = Blockly.Theme.defineTheme("cognitoPastel", {
      base: Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: "#FFEBD6",
        toolboxBackgroundColour: "#FFF7F0",
        toolboxForegroundColour: "#334155",
        flyoutBackgroundColour: "#FFF7F0",
        flyoutOpacity: 0.98,
        scrollbarColour: "#c7c7c7",
        insertionMarkerColour: brandOrange,
        insertionMarkerOpacity: 0.6,
        cursorColour: brandOrange,
        markerColour: brandOrange,
        selectedGlowColour: brandOrange,
        selectedGlowSize: 2
      }
    });

    // Full default toolbox
    const toolboxXml = `
      <xml id="toolbox" style="display: none">
        <category name="Logic" categorystyle="logic_category">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_negate"></block>
          <block type="logic_boolean"></block>
          <block type="logic_null"></block>
          <block type="logic_ternary"></block>
        </category>
        <category name="Loops" categorystyle="loop_category">
          <block type="controls_repeat_ext">
            <value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
          </block>
          <block type="controls_whileUntil"></block>
          <block type="controls_for">
            <value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            <value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
          </block>
          <block type="controls_forEach"></block>
          <block type="controls_flow_statements"></block>
        </category>
        <category name="Math" categorystyle="math_category">
          <block type="math_number"><field name="NUM">0</field></block>
          <block type="math_arithmetic"></block>
          <block type="math_single"></block>
          <block type="math_trig"></block>
          <block type="math_constant"></block>
          <block type="math_number_property"></block>
          <block type="math_round"></block>
          <block type="math_on_list"></block>
          <block type="math_modulo"></block>
          <block type="math_constrain"></block>
          <block type="math_random_int"></block>
          <block type="math_random_float"></block>
          <block type="math_atan2"></block>
        </category>
        <category name="Text" categorystyle="text_category">
          <block type="text"></block>
          <block type="text_join"></block>
          <block type="text_append"><value name="TEXT"><shadow type="text"></shadow></value></block>
          <block type="text_length"></block>
          <block type="text_isEmpty"></block>
          <block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block>
          <block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block>
          <block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value></block>
          <block type="text_changeCase"></block>
          <block type="text_trim"></block>
          <block type="text_print"></block>
          <block type="text_prompt_ext"></block>
        </category>
        <category name="Lists" categorystyle="list_category">
          <block type="lists_create_empty"></block>
          <block type="lists_create_with"></block>
          <block type="lists_repeat"><value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block>
          <block type="lists_length"></block>
          <block type="lists_isEmpty"></block>
          <block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block>
          <block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block>
          <block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR">list</field></block></value></block>
          <block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR">list</field></block></value></block>
          <block type="lists_sort"></block>
          <block type="lists_split"></block>
          <block type="lists_reverse"></block>
        </category>
        <category name="Colour" categorystyle="colour_category">
          <block type="colour_picker"></block>
          <block type="colour_random"></block>
          <block type="colour_rgb"></block>
          <block type="colour_blend"></block>
        </category>
        <sep></sep>
        <category name="Variables" categorystyle="variable_category" custom="VARIABLE"></category>
        <category name="Functions" categorystyle="procedure_category" custom="PROCEDURE"></category>
      </xml>
    `;

    // Inject Blockly into the right-hand main workspace
    const ws = Blockly.inject(blocklyDiv.current, {
      theme: PastelTheme,
      toolbox: Blockly.utils.xml.textToDom(toolboxXml),
      zoom: { controls: true, wheel: true },
      renderer: "thrasos",
      move: { scrollbars: true, drag: true, wheel: true },
      trashcan: true
    });
    workspaceRef.current = ws;

    // Starter block
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

    // Resize handling
    const resize = () => Blockly.svgResize(ws);
    requestAnimationFrame(resize);
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(blocklyDiv.current);

    // Load Pyodide (Python 3) once
    setPyStatus("loading");
    (async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
        script.onload = async () => {
          try {
            // @ts-ignore
            const py = await window.loadPyodide?.();
            if (py) {
              // Shim input() so prompt blocks don’t hang
              await py.runPythonAsync(`
import builtins
def __cognito_input(prompt=""):
    return ""
builtins.input = __cognito_input
              `.trim());
              pyodideRef.current = py;
              setPyStatus("ready");
              setRunOutput("// Python 3 runtime ready");
            } else {
              setPyStatus("error");
              setRunOutput("// Failed to initialize Pyodide");
            }
          } catch (e) {
            setPyStatus("error");
            setRunOutput("// Pyodide error: " + e);
          }
        };
        script.onerror = () => {
          setPyStatus("error");
          setRunOutput("// Could not load Pyodide script");
        };
        document.body.appendChild(script);
      } catch (e) {
        setPyStatus("error");
        setRunOutput("// Pyodide load exception: " + e);
      }
    })();

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

  // Timeout helper for long/infinite loops
  function runWithTimeout(promise, ms) {
    let t;
    return Promise.race([
      promise.finally(() => clearTimeout(t)),
      new Promise((_, reject) => (t = setTimeout(() => reject(new Error("TIMEOUT")), ms)))
    ]);
  }

  async function runCode() {
    if (lang !== "python") {
      setRunOutput(`// Run not available for '${lang}' yet`);
      return;
    }
    if (!workspaceRef.current) {
      setRunOutput("// Workspace not ready");
      return;
    }
    if (pyStatus !== "ready" || !pyodideRef.current) {
      setRunOutput(pyStatus === "loading" ? "// Python runtime loading..." : "// Python runtime not ready");
      return;
    }
    if (isRunning) return;

    setIsRunning(true);
    setRunOutput("▶ Running…");

    // Let the UI paint “Running…” before heavy work
    setTimeout(async () => {
      // Capture stdout/stderr per run
      let buffer = "";
      pyodideRef.current.setStdout({ batched: (txt) => { buffer += txt + "\n"; } });
      pyodideRef.current.setStderr({ batched: (txt) => { buffer += txt + "\n"; } });

      const code = Blockly.Python.workspaceToCode(workspaceRef.current);

      try {
        await runWithTimeout(pyodideRef.current.runPythonAsync(code), 4000); // 4s cap
        setRunOutput(buffer.trim() ? buffer.trim() : "(no output)");
      } catch (err) {
        if (String(err) === "Error: TIMEOUT") {
          setRunOutput("⏱️ Timed out after 4s. Possible infinite loop or long-running code.");
        } else {
          setRunOutput("Error:\n" + err);
        }
      } finally {
        setIsRunning(false);
      }
    }, 0);
  }

  function copyCode() {
    navigator.clipboard.writeText(codeOutput || "");
  }
  function clearRun() { setRunOutput("// Run output will appear here"); }
  function clearWorkspace() { workspaceRef.current?.clear(); }

  // Brand color reused
  const brandOrange = "#FF7A00";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding: 12,
        display: "grid",
        gridTemplateRows: "auto auto 1fr 28vh", // header, toolbar, main (with sidebar), code row
        gap: 8,
        boxSizing: "border-box",
        background: "#FFF7F0"
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 12px",
          borderRadius: 8,
          background: "#FFF0E3",
          border: "1px solid #FFD8B5"
        }}
        aria-label="Cognito header"
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
        <button onClick={runCode} disabled={lang !== "python" || pyStatus !== "ready" || isRunning}>
          {pyStatus === "loading" ? "Loading Python…" : isRunning ? "Running…" : "Run"}
        </button>
        <button onClick={copyCode}>Copy Code</button>
        <button onClick={clearRun}>Clear Run</button>
        <button onClick={clearWorkspace} style={{ marginLeft: "auto" }}>Clear Workspace</button>
      </div>

      {/* MAIN: Sidebar (assignments) + Playground (Blockly + Run) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr", // left = assignments, right = playground
          gap: 8,
          minHeight: 0
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            border: "1px solid #FFD8B5",
            borderRadius: 8,
            background: "#FFF0E3",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflow: "auto"
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9a5b00" }}>ASSIGNMENT</div>
          <div style={{ fontWeight: 800, lineHeight: 1.2 }}>{current.title}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{current.level} • {category}</div>
          <p style={{ margin: 0 }}>{current.desc}</p>

          <label style={{ fontSize: 12, marginTop: 6 }}>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{ padding: "6px 8px" }}>
            <option>Intro to Python</option>
            <option>Roblox Lua Basics</option>
            <option>JavaScript Basics</option>
          </select>

          <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              style={{ flex: 1 }}
            >
              ◀ Prev
            </button>
            <button
              onClick={() => setCurrentIndex(i => Math.min(assignments.length - 1, i + 1))}
              disabled={currentIndex === assignments.length - 1}
              style={{ flex: 1 }}
            >
              Next ▶
            </button>
          </div>
        </aside>

        {/* Playground right: Blockly + Run side-by-side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 8,
            minHeight: 0
          }}
        >
          <div
            ref={blocklyDiv}
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #e9c9a9",
              borderRadius: 8
            }}
          />
          <pre
            style={{
              margin: 0,
              padding: 10,
              background: "#E6F4FF",
              color: "#0b3a5b",
              border: "1px solid #cfe8ff",
              borderRadius: 8,
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}
          >
            {runOutput}
          </pre>
        </div>
      </div>

      {/* BOTTOM: Code output full width */}
      <pre
        style={{
          margin: 0,
          padding: 10,
          background: "#1e1e1e",
          color: "#d4d4d4",
          borderRadius: 8,
          overflow: "auto",
          whiteSpace: "pre-wrap"
        }}
      >
        {codeOutput}
      </pre>
    </div>
  );
}



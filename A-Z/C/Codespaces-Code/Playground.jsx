// src/Playground.jsx
import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";

import PlaygroundLayout from "./PlaygroundLayout";
import {
  createCognitoTheme,
  getToolboxXml,
  computeGenReady,
  generateFromWorkspace,
} from "./PlaygroundTools";
import { loadPyodideRuntime, runPython } from "./pyodideRuntime";

export default function Playground() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const pyodideRef = useRef(null);

  const [lang, setLang] = useState("python");
  const [codeOutput, setCodeOutput] = useState("// Generated code will appear here");
  const [runOutput, setRunOutput] = useState("// Run output will appear here");

  // runtime + gating
  const [pyStatus, setPyStatus] = useState("idle"); // idle | loading | ready | error
  const [isRunning, setIsRunning] = useState(false);
  const [genReady, setGenReady] = useState({ python: false, lua: false, js: false });

  // Sidebar stub
  const assignments = [
    { id: "ap-hello", title: "Hello World (Python)", level: "Beginner", desc: "Use a print block to say hello." },
    { id: "ap-vars",  title: "Variables + Print",     level: "Beginner", desc: "Create a variable and print it." },
  ];
  const [category, setCategory] = useState("Intro to Python");
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = assignments[currentIndex];

  // Mount: inject Blockly and load Pyodide (no auto-generate, no auto-run)
  useEffect(() => {
    if (!blocklyDiv.current) return;

    const theme = createCognitoTheme("#FF7A00");
    const toolboxXml = getToolboxXml();

    const ws = Blockly.inject(blocklyDiv.current, {
      theme,
      toolbox: Blockly.utils.xml.textToDom(toolboxXml),
      zoom: { controls: true, wheel: true },
      renderer: "thrasos",
      move: { scrollbars: true, drag: true, wheel: true },
      trashcan: true,
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
      </xml>`;
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(startXml), ws);

    setGenReady(computeGenReady());

    // Resize only
    const resize = () => Blockly.svgResize(ws);
    requestAnimationFrame(resize);
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(blocklyDiv.current);

    // Load Pyodide
    setPyStatus("loading");
    loadPyodideRuntime()
      .then((py) => {
        pyodideRef.current = py;
        setPyStatus("ready");
        setRunOutput("// Python 3 runtime ready");
      })
      .catch((err) => {
        setPyStatus("error");
        setRunOutput("// Pyodide error: " + err.message);
      });

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      ws.dispose();
    };
  }, []);

  // If language changes we only update generator availability
  useEffect(() => {
    setGenReady(computeGenReady());
  }, [lang]);

  // Toolbar actions
  function manualGenerate() {
    const ws = workspaceRef.current;
    if (!ws) return;
    setGenReady(computeGenReady());
    const code = generateFromWorkspace(ws, lang);
    setCodeOutput(code ? code : "// (empty)");
  }

  async function handleRun() {
    if (lang !== "python") {
      setRunOutput(`// Run not available for '${lang}' yet`);
      return;
    }
    const ws = workspaceRef.current;
    if (!ws) { setRunOutput("// Workspace not ready"); return; }
    if (!genReady.python) { setRunOutput("// Python generator not available"); return; }
    if (pyStatus !== "ready" || !pyodideRef.current) {
      setRunOutput(pyStatus === "loading" ? "// Python runtime loading..." : "// Python runtime not ready");
      return;
    }
    if (isRunning) return;

    const code = (generateFromWorkspace(ws, "python") || "").trim();
    if (!code || code.startsWith("//")) { setRunOutput("// Nothing runnable yet (no Python code)"); return; }

    setIsRunning(true);
    setRunOutput("▶ Running…");
    setTimeout(async () => {
      try {
        const out = await runPython(pyodideRef.current, code, 4000);
        setRunOutput(out);
      } catch (err) {
        setRunOutput(String(err) === "Error: TIMEOUT"
          ? "⏱️ Timed out after 4s. Possible infinite loop or long-running code."
          : "Error:\n" + err);
      } finally {
        setIsRunning(false);
      }
    }, 0);
  }

  const canRun = (lang === "python" && pyStatus === "ready" && genReady.python && !isRunning);

  function copyCode() { navigator.clipboard.writeText(codeOutput || ""); }
  function clearRun() { setRunOutput("// Run output will appear here"); }
  function clearWorkspace() { workspaceRef.current?.clear(); }

  return (
    <PlaygroundLayout
      // toolbar
      lang={lang} setLang={setLang}
      onGenerate={manualGenerate}
      onRun={handleRun}
      canRun={canRun}
      runLabel={pyStatus === "loading" ? "Loading Python…" : isRunning ? "Running…" : "Run"}
      onCopy={copyCode}
      onClearRun={clearRun}
      onClearWorkspace={clearWorkspace}
      // panels
      runOutput={runOutput}
      codeOutput={codeOutput}
      // assignments
      assignment={current}
      category={category}
      setCategory={setCategory}
      onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
      onNext={() => setCurrentIndex((i) => Math.min(assignments.length - 1, i + 1))}
      canPrev={currentIndex > 0}
      canNext={currentIndex < assignments.length - 1}
      // blockly mount
      blocklyRef={blocklyDiv}
    />
  );
}


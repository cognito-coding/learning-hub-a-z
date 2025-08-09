// src/Playground.jsx
import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/python";

export default function Playground() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [codeOutput, setCodeOutput] = useState("// Generated code will appear here");
  const [runOutput, setRunOutput] = useState("// Run output will appear here");

  useEffect(() => {
    if (!blocklyDiv.current) return;

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
      toolbox: Blockly.utils.xml.textToDom(toolboxXml),
      zoom: { controls: true, wheel: true },
      renderer: "thrasos",
      move: { scrollbars: true, drag: true, wheel: true },
      trashcan: true,
    });
    workspaceRef.current = ws;

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

  function generatePython() {
    if (!workspaceRef.current) return;
    const code = Blockly.Python.workspaceToCode(workspaceRef.current);
    setCodeOutput(code || "// (empty)");
    console.clear();
    console.log("[python] generated:\n" + code);
  }

  function runCode() {
    setRunOutput(">>> Running Python...\n" + (codeOutput || "// (empty)") + "\n// execution not wired yet");
  }

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
      }}
    >
      {/* Toolbar */}
      <div>
        <button onClick={generatePython} style={{ marginRight: 8 }}>Generate Python</button>
        <button onClick={runCode}>Run</button>
      </div>

      {/* TOP ROW: Blockly (left) + Run output (right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 8,
          minHeight: 0, // allow children to size correctly
        }}
      >
        <div
          ref={blocklyDiv}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #333",
            borderRadius: 8,
          }}
        />
        <pre
          style={{
            margin: 0,
            padding: 8,
            background: "#0d0d0d",
            color: "#22d3ee",
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
          padding: 8,
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



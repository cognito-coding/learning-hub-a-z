import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";

export default function Playground() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    console.log("Playground mount, div size:",
      blocklyDiv.current.clientWidth, "x", blocklyDiv.current.clientHeight);

    const toolboxXml = `
      <xml id="toolbox" style="display: none">
        <category name="Logic" categorystyle="logic_category">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
        </category>
        <category name="Math" categorystyle="math_category">
          <block type="math_number"><field name="NUM">0</field></block>
          <block type="math_arithmetic"></block>
        </category>
      </xml>
    `;
    const toolbox = Blockly.utils.xml.textToDom(toolboxXml);

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox,
      trashcan: true,
      grid: { spacing: 20, length: 3, snap: true }, // should show a grid
      zoom: { controls: true, wheel: true }
    });

    console.log("Workspace created:", !!workspaceRef.current);

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  // Add strong visual styles so we can see the container for sure
return (
  <div
    ref={blocklyDiv}
    style={{
      position: "fixed",  // ignore parent sizing
      inset: 0,           // top/right/bottom/left = 0
      overflow: "hidden"
    }}
  />
);

}

import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript"; // (we’ll swap generators later as needed)

export default function Playground() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

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
    });

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  return <div ref={blocklyDiv} style={{ height: "100vh", width: "100%" }} />;
}

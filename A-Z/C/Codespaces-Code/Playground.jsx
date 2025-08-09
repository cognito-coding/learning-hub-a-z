import React, { useEffect, useRef } from "react";
import Blockly from "blockly";

export default function Playground() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (blocklyDiv.current && !workspaceRef.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: `<xml>
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
        </xml>`,
      });
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div ref={blocklyDiv} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

import * as Blockly from "blockly";

// Pastel theme (pale orange) with brand accent
export function createCognitoTheme(brand = "#FF7A00") {
  return Blockly.Theme.defineTheme("cognitoPastel", {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: "#FFEBD6",
      toolboxBackgroundColour: "#FFF7F0",
      toolboxForegroundColour: "#334155",
      flyoutBackgroundColour: "#FFF7F0",
      flyoutOpacity: 0.98,
      scrollbarColour: "#c7c7c7",
      insertionMarkerColour: brand,
      insertionMarkerOpacity: 0.6,
      cursorColour: brand,
      markerColour: brand,
      selectedGlowColour: brand,
      selectedGlowSize: 2,
    },
  });
}

// Full default toolbox XML
export function getToolboxXml() {
  return `
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
}

export function computeGenReady() {
  return {
    python: !!(Blockly.Python && typeof Blockly.Python.workspaceToCode === "function"),
    lua: !!(Blockly.Lua && typeof Blockly.Lua.workspaceToCode === "function"),
    js: !!(Blockly.JavaScript && typeof Blockly.JavaScript.workspaceToCode === "function"),
  };
}

export function generateFromWorkspace(ws, language) {
  if (!ws) return "// (no workspace yet)";

  const ready = computeGenReady();
  if (language === "python") {
    if (!ready.python) return "// (generator not available: python)";
    return Blockly.Python.workspaceToCode(ws) || "";
  }
  if (language === "lua") {
    if (!ready.lua) return "// (generator not available: lua)";
    return Blockly.Lua.workspaceToCode(ws) || "";
  }
  if (language === "js") {
    if (!ready.js) return "// (generator not available: js)";
    return Blockly.JavaScript.workspaceToCode(ws) || "";
  }
  if (language === "html") {
    return `<!-- TODO: HTML generator -->
<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Cognito</title></head>
  <body>
    <!-- convert blocks to HTML here -->
  </body>
</html>`;
  }
  if (language === "css") {
    return `/* TODO: CSS generator */
body {
  font-family: system-ui, sans-serif;
}`;
  }
  return "";
}

// Load Pyodide from CDN, shim input(), return instance
export async function loadPyodideRuntime() {
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
    s.onload = resolve;
    s.onerror = () => reject(new Error("pyodide script load failed"));
    document.body.appendChild(s);
  });
  // @ts-ignore
  const py = await window.loadPyodide?.();
  if (!py) throw new Error("pyodide init failed");
  await py.runPythonAsync(`
import builtins
def __cognito_input(prompt=""):
    return ""
builtins.input = __cognito_input
  `.trim());
  return py;
}

// Run Python with timeout and capture stdout/stderr
export async function runPython(pyodide, code, ms = 4000) {
  if (!pyodide) throw new Error("pyodide not ready");
  let buffer = "";
  pyodide.setStdout({ batched: (txt) => { buffer += txt + "\\n"; } });
  pyodide.setStderr({ batched: (txt) => { buffer += txt + "\\n"; } });

  let t;
  try {
    await Promise.race([
      pyodide.runPythonAsync(code),
      new Promise((_, rej) => (t = setTimeout(() => rej(new Error("TIMEOUT")), ms))),
    ]);
  } finally {
    clearTimeout(t);
  }
  return buffer.trim() || "(no output)";
}


// src/PlaygroundTools.js
import * as Blockly from "blockly";
import "blockly/blocks"; // ensure built-in blocks (text_print, etc.) are registered
import { pythonGenerator } from "blockly/python";
import { luaGenerator } from "blockly/lua";
import { javascriptGenerator } from "blockly/javascript";

/* ----------------------------------------------------------
   FIX: Make Python text_print use a newline (no end='')
   ---------------------------------------------------------- */
pythonGenerator.forBlock["text_print"] = function (block) {
  const arg0 =
    pythonGenerator.valueToCode(block, "TEXT", pythonGenerator.ORDER_NONE) || "''";
  // newline so stacked prints appear on separate lines in generated code
  return `print(${arg0})\n`;
};

/* ----------------------------------------------------------
   Theme (pastel orange)
   ---------------------------------------------------------- */
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

/* ----------------------------------------------------------
   Toolbox XML
   ---------------------------------------------------------- */
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
      <block type="text_indexOf">
        <value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value>
      </block>
      <block type="text_charAt">
        <value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value>
      </block>
      <block type="text_getSubstring">
        <value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value>
      </block>
      <block type="text_changeCase"></block>
      <block type="text_trim"></block>

      <!-- Include text_print with a default shadow so it's obvious -->
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text"><field name="TEXT">Hello Cognito!</field></shadow>
        </value>
      </block>

      <block type="text_prompt_ext"></block>
    </category>

    <category name="Lists" categorystyle="list_category">
      <block type="lists_create_empty"></block>
      <block type="lists_create_with"></block>
      <block type="lists_repeat">
        <value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
      </block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_indexOf">
        <value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value>
      </block>
      <block type="lists_getIndex">
        <value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value>
      </block>
      <block type="lists_setIndex">
        <value name="LIST"><block type="variables_get"><field name="VAR">list</field></block></value>
      </block>
      <block type="lists_getSublist">
        <value name="LIST"><block type="variables_get"><field name="VAR">list</field></block></value>
      </block>
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

/* ----------------------------------------------------------
   Generators and helpers
   ---------------------------------------------------------- */
export const gens = {
  python: pythonGenerator,
  lua: luaGenerator,
  js: javascriptGenerator,
};

export function computeGenReady() {
  return { python: !!gens.python, lua: !!gens.lua, js: !!gens.js };
}

export function generateFromWorkspace(ws, language) {
  if (!ws) return "// (no workspace yet)";

  if (language === "python") return gens.python.workspaceToCode(ws) || "";
  if (language === "lua")    return gens.lua.workspaceToCode(ws) || "";
  if (language === "js")     return gens.js.workspaceToCode(ws) || "";

  if (language === "html")   return "<!-- HTML generator TBD -->";
  if (language === "css")    return "/* CSS generator TBD */";

  return "";
}

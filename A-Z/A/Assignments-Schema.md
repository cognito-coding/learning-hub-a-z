# Assignment Schema

Each lesson is **language-agnostic** but can be Roblox-specific when needed.

## Example
```json
{
  "language": "lua",
  "title": "Sprint Mechanic - Step 1",
  "instructions": "Detect when LeftShift is pressed.",
  "starter_code": " -- your code here ",
  "test_case": "checkShiftPress()",
  "hints": ["Use UserInputService.InputBegan", "Compare KeyCode to Enum.KeyCode.LeftShift"],
  "is_block_mode": false
}
```

## Fields
- `language` → `"lua" | "python" | "javascript"`
- `title` → Step title
- `instructions` → Student-facing description
- `starter_code` / `starter_blocks` → Preloaded code or blocks
- `test_case` → Function or logic to validate student code
- `hints` → Optional array of tips
- `is_block_mode` → Boolean for Blockly lessons

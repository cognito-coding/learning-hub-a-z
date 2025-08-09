// src/pyodideRuntime.js
export async function loadPyodideRuntime() {
  if (!window.__pyodideLoader) {
    window.__pyodideLoader = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      s.onload = resolve;
      s.onerror = () => reject(new Error("pyodide script load failed"));
      document.body.appendChild(s);
    });
  }
  await window.__pyodideLoader;

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

export async function runPython(pyodide, code, ms = 4000) {
  if (!pyodide) throw new Error("pyodide not ready");

  let buffer = "";
  const append = (txt) => {
    buffer += txt;
    // add a newline only if this chunk didn't end with one
    if (!txt.endsWith("\n")) buffer += "\n";
  };

  pyodide.setStdout({ batched: append });
  pyodide.setStderr({ batched: append });

  let timer;
  try {
    await Promise.race([
      pyodide.runPythonAsync(code),
      new Promise((_, rej) => (timer = setTimeout(() => rej(new Error("TIMEOUT")), ms))),
    ]);
  } finally {
    clearTimeout(timer);
  }

  // keep natural line breaks
  return buffer.replace(/\r\n/g, "\n");
}



#Edit src/main.jsx to this:

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Playground from "./Playground.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/playground", element: <Playground /> }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

Then replace src/App.jsx with:

#import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Cognito Coding Learning Hub</h1>
      <p>Day 2 — base scaffold.</p>
      <p><Link to="/playground">Open Blockly Playground →</Link></p>
    </div>
  );
}

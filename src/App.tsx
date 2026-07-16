import { useEffect, useState } from "react";
import { motion } from "motion/react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import {
  Effect,
  EffectState,
  getCurrentWindow,
} from "@tauri-apps/api/window";
import { useWindowDragOffset } from "./hooks/useWindowDragOffset";
import "./App.css";

function App() {
  const { x, y } = useWindowDragOffset();
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");
  const [alwaysOnTop, setAlwaysOnTop] = useState(false);

  useEffect(() => {
    const appWindow = getCurrentWindow();

    appWindow
      .setBackgroundColor({ red: 0, green: 0, blue: 0, alpha: 0 })
      .catch(() => {});

    appWindow
      .setEffects({
        effects: [Effect.HudWindow],
        state: EffectState.Active,
        radius: 24,
      })
      .catch(() => {});

    appWindow
      .isAlwaysOnTop()
      .then(setAlwaysOnTop)
      .catch(() => {});
  }, []);

  async function toggleAlwaysOnTop() {
    const appWindow = getCurrentWindow();
    const next = !alwaysOnTop;
    await appWindow.setAlwaysOnTop(next);
    setAlwaysOnTop(next);
  }

  // async function greet() {
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  function handleDragStart(event: React.MouseEvent<HTMLDivElement>) {
    if (event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, select, textarea, label")) return;

    void getCurrentWindow().startDragging();
  }

  return (
    <div
      className="app-shell"
      data-tauri-drag-region
      onMouseDown={handleDragStart}
    >
      <button
        type="button"
        className={`always-on-top-toggle${alwaysOnTop ? " active" : ""}`}
        onClick={toggleAlwaysOnTop}
        title={alwaysOnTop ? "Disable always on top" : "Enable always on top"}
        aria-pressed={alwaysOnTop}
      >
        Pin
      </button>

      <motion.div
        className="red-ball"
        data-tauri-drag-region
        style={{ x, y }}
      />

      {/* <main className="glass-panel glass-surface container" data-tauri-drag-region>
        <motion.div className="drag-content" style={{ x, y }}>
        <h1>Welcome to Tauri + React</h1>

        <div className="row logos">
          <a href="https://vite.dev" target="_blank">
            <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>

        <p>{greetMsg}</p>
        </motion.div>
      </main> */}
    </div>
  );
}

export default App;

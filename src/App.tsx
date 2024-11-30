import React from "react";
import Maze from "./components/Maze";
import "./styles/App.css"; // Keep this for custom styling if needed

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Eternal Labyrinth</h1>
          <p>Navigate through the maze. Can you find the way out?</p>
        </header>
        <main>
          <Maze rows={25} cols={25} />
        </main>
        <footer>
          <p>Created by Felipe Assis</p>
        </footer>
      </div>
  );
}

export default App;

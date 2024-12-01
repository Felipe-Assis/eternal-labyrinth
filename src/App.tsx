import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Maze from "./components/Maze";
import EternalLabyrinthOmega from "./components/EternalLabyrinthOmega";
import "./styles/App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Eternal Labyrinth</h1>
                    <nav>
                        <Link to="/">Classic</Link> | <Link to="/omega">Omega</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Maze rows={20} cols={40} />} />
                    <Route path="/omega" element={<EternalLabyrinthOmega rows={20} cols={40} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

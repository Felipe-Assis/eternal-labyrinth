import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { generateMaze, Cell } from "../utils/mazeGenerator";

const themes : any = {
    forest: {
        background: "#e8f5e9",
        wallColor: "#1b5e20",
        playerColor: "#388e3c",
        goalColor: "#4caf50",
    },
    volcano: {
        background: "#ffebee",
        wallColor: "#b71c1c",
        playerColor: "#f44336",
        goalColor: "#ff5722",
    },
    ocean: {
        background: "#ebfeff",
        wallColor: "#1c3bb7",
        playerColor: "#36bbf4",
        goalColor: "#2282ff",
    },
};

const EternalLabyrinthOmega: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const cellSize = 30; // Size of each cell in pixels
    const [maze, setMaze] = useState<Cell[][]>(() => generateMaze(rows, cols));
    const [player, setPlayer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [theme, setTheme] = useState("forest");

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);

        // Clear previous SVG content
        svg.selectAll("*").remove();

        // Set SVG dimensions and background color
        svg.attr("width", cols * cellSize)
            .attr("height", rows * cellSize)
            .style("border", "1px solid black")
            .style("background-color", themes[theme].background);

        // Draw maze
        maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                const g = svg.append("g").attr("transform", `translate(${x * cellSize}, ${y * cellSize})`);

                // Draw walls
                if (cell.walls.top)
                    g.append("line")
                        .attr("x1", 0)
                        .attr("y1", 0)
                        .attr("x2", cellSize)
                        .attr("y2", 0)
                        .attr("stroke", themes[theme].wallColor)
                        .attr("stroke-width", 2);

                if (cell.walls.right)
                    g.append("line")
                        .attr("x1", cellSize)
                        .attr("y1", 0)
                        .attr("x2", cellSize)
                        .attr("y2", cellSize)
                        .attr("stroke", themes[theme].wallColor)
                        .attr("stroke-width", 2);

                if (cell.walls.bottom)
                    g.append("line")
                        .attr("x1", 0)
                        .attr("y1", cellSize)
                        .attr("x2", cellSize)
                        .attr("y2", cellSize)
                        .attr("stroke", themes[theme].wallColor)
                        .attr("stroke-width", 2);

                if (cell.walls.left)
                    g.append("line")
                        .attr("x1", 0)
                        .attr("y1", 0)
                        .attr("x2", 0)
                        .attr("y2", cellSize)
                        .attr("stroke", themes[theme].wallColor)
                        .attr("stroke-width", 2);
            });
        });

        // Draw player
        svg.append("circle")
            .attr("cx", player.x * cellSize + cellSize / 2)
            .attr("cy", player.y * cellSize + cellSize / 2)
            .attr("r", cellSize / 4)
            .attr("fill", themes[theme].playerColor)
            .attr("id", "player");

        // Draw goal
        svg.append("rect")
            .attr("x", (cols - 1) * cellSize + cellSize / 4)
            .attr("y", (rows - 1) * cellSize + cellSize / 4)
            .attr("width", cellSize / 2)
            .attr("height", cellSize / 2)
            .attr("fill", themes[theme].goalColor)
            .attr("id", "goal");
    }, [maze, player, theme]);

    // Handle player movement
    const handleKeyDown = (event: KeyboardEvent) => {
        const { x, y } = player;
        const currentCell = maze[y][x];

        let newX = x;
        let newY = y;

        if (event.key === "ArrowUp" && !currentCell.walls.top) newY -= 1;
        if (event.key === "ArrowDown" && !currentCell.walls.bottom) newY += 1;
        if (event.key === "ArrowLeft" && !currentCell.walls.left) newX -= 1;
        if (event.key === "ArrowRight" && !currentCell.walls.right) newX += 1;

        // Prevent out-of-bounds movement
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
            setPlayer({ x: newX, y: newY });
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [player, maze]);

    return (
        <div>
            <h2>Eternal Labyrinth Omega</h2>
            <div>
                <label>
                    Theme:{" "}
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="forest">Forest</option>
                        <option value="volcano">Volcano</option>
                        <option value="ocean">Ocean</option>
                    </select>
                </label>
            </div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default EternalLabyrinthOmega;

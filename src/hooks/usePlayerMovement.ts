import { useState, useEffect } from "react";
import { Cell } from "../utils/mazeGenerator";

export function usePlayerMovement(maze: Cell[][]) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const move = (direction: string) => {
        setPosition((prev) => {
            const { x, y } = prev;
            const currentCell = maze[y][x];

            // Check walls before moving
            if (direction === "ArrowUp" && y > 0 && !currentCell.walls.top) return { x, y: y - 1 };
            if (direction === "ArrowDown" && y < maze.length - 1 && !currentCell.walls.bottom) return { x, y: y + 1 };
            if (direction === "ArrowLeft" && x > 0 && !currentCell.walls.left) return { x: x - 1, y };
            if (direction === "ArrowRight" && x < maze[0].length - 1 && !currentCell.walls.right) return { x: x + 1, y };

            // If the move is invalid, return the same position
            return prev;
        });
    };

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => move(e.key);
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [maze]); // Depend on the maze so it can update if the maze changes

    return position;
}

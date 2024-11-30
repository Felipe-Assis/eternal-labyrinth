import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { generateMaze, Cell } from "../utils/mazeGenerator";
import { usePlayerMovement } from "../hooks/usePlayerMovement";

const MazeContainer = styled.div`
  display: grid;
  gap: 2px;
`;

const CellStyled = styled.div<{ walls: Cell["walls"]; isPlayer?: boolean; isGoal?: boolean }>`
  width: 20px;
  height: 20px;
  background: ${({ isPlayer, isGoal }) =>
          isPlayer ? "blue" : isGoal ? "green" : "white"};
  border-top: ${({ walls }) => (walls.top ? "2px solid black" : "none")};
  border-right: ${({ walls }) => (walls.right ? "2px solid black" : "none")};
  border-bottom: ${({ walls }) => (walls.bottom ? "2px solid black" : "none")};
  border-left: ${({ walls }) => (walls.left ? "2px solid black" : "none")};
`;


const WinMessage = styled.div`
  text-align: center;
  font-size: 1.5em;
  color: green;
  margin-top: 20px;
`;

const RestartButton = styled.button`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const Maze: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
    const [maze, setMaze] = useState<Cell[][]>([]);
    const [goal, setGoal] = useState<{ x: number; y: number }>({ x: cols - 1, y: rows - 1 });
    const playerPosition = usePlayerMovement(maze);
    const [hasWon, setHasWon] = useState(false);

    // Generate the maze and set the goal when the component mounts
    useEffect(() => {
        const generatedMaze = generateMaze(rows, cols);
        setMaze(generatedMaze);

        // Generate a random goal position
        const randomGoal = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
        };
        setGoal(randomGoal);
    }, [rows, cols]);


    // Check for win condition
    useEffect(() => {
        if (playerPosition.x === goal.x && playerPosition.y === goal.y) {
            setHasWon(true);
        }
    }, [playerPosition, goal]);

    return (
        <>
            <MazeContainer style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {maze.flat().map((cell) => (
                    <CellStyled
                        key={`${cell.x}-${cell.y}`}
                        walls={cell.walls}
                        isPlayer={playerPosition.x === cell.x && playerPosition.y === cell.y}
                        isGoal={goal.x === cell.x && goal.y === cell.y}
                    />
                ))}
            </MazeContainer>
            {hasWon && <WinMessage>🎉 You Win! 🎉</WinMessage>}
        </>
    );
};

export default Maze;
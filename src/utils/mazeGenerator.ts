export type Cell = { x: number; y: number; visited: boolean; walls: { top: boolean; right: boolean; bottom: boolean; left: boolean } };

export function generateMaze(rows: number, cols: number): Cell[][] {
    const maze: Cell[][] = Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => ({
            x,
            y,
            visited: false,
            walls: { top: true, right: true, bottom: true, left: true },
        }))
    );

    function carvePath(current: Cell) {
        current.visited = true;
        const directions: Array<keyof Cell["walls"]> = shuffle(["top", "right", "bottom", "left"]);
        for (const direction of directions) {
            const [dx, dy] = getDirectionOffsets(direction);
            const nx = current.x + dx;
            const ny = current.y + dy;

            if (nx >= 0 && ny >= 0 && ny < rows && nx < cols && !maze[ny][nx].visited) {
                current.walls[direction] = false; // This is now correctly typed
                maze[ny][nx].walls[oppositeWall(direction)] = false; // No error here
                carvePath(maze[ny][nx]);
            }
        }
    }


    carvePath(maze[0][0]);
    return maze;
}

function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

function getDirectionOffsets(direction: string): [number, number] {
    switch (direction) {
        case "top": return [0, -1];
        case "right": return [1, 0];
        case "bottom": return [0, 1];
        case "left": return [-1, 0];
        default: return [0, 0];
    }
}

function oppositeWall(direction: keyof Cell["walls"]): keyof Cell["walls"] {
    const mapping: Record<keyof Cell["walls"], keyof Cell["walls"]> = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    };
    return mapping[direction];
}


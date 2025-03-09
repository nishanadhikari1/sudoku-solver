export type SudokuGrid = (number | null)[][]

export interface SolveStep {
  row: number
  col: number
  value: number | null
  isBacktrack: boolean
}

export function solveSudoku(grid: SudokuGrid, callback: (step: SolveStep) => void): boolean {
  if (!isInitialGridValid(grid)) {
    return false
  }

  const emptyCell = findEmptyCell(grid)
  if (!emptyCell) return true

  const [row, col] = emptyCell

  for (let num = 1; num <= 9; num++) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num
      callback({ row, col, value: num, isBacktrack: false })

      if (solveSudoku(grid, callback)) {
        return true
      }

      grid[row][col] = null
      callback({ row, col, value: null, isBacktrack: true })
    }
  }

  return false
}

function isInitialGridValid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col]
      if (value !== null) {
        for (let i = 0; i < 9; i++) {
          if (i !== col && grid[row][i] === value) {
            return false
          }
        }

        for (let i = 0; i < 9; i++) {
          if (i !== row && grid[i][col] === value) {
            return false 
          }
        }

        const boxRow = Math.floor(row / 3) * 3
        const boxCol = Math.floor(col / 3) * 3
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (boxRow + i !== row && boxCol + j !== col && grid[boxRow + i][boxCol + j] === value) {
              return false
            }
          }
        }
      }
    }
  }
  return true 
}

function findEmptyCell(grid: SudokuGrid): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return [row, col]
      }
    }
  }
  return null
}

function isValid(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false
  }

  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false
    }
  }

  return true
}

export function generateSudoku(difficulty: "easy" | "medium" | "hard"): SudokuGrid {
  let grid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));

  fillDiagonalBoxes(grid); 

  solveSudoku(grid, () => {});

  const cellsToRemove = { easy: 30, medium: 40, hard: 50 }[difficulty];
  removeNumbers(grid, cellsToRemove);

  return grid;
}

function fillDiagonalBoxes(grid: SudokuGrid) {
  for (let box = 0; box < 9; box += 3) {
    let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[box + i][box + j] = nums.pop()!;
      }
    }
  }
}

function removeNumbers(grid: SudokuGrid, count: number) {
  let attempts = count;
  while (attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    while (grid[row][col] === null) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    let backup = grid[row][col];
    grid[row][col] = null;

    let tempGrid = JSON.parse(JSON.stringify(grid));
    if (!solveSudoku(tempGrid, () => {})) {
      grid[row][col] = backup;
    } else {
      attempts--;
    }
  }
}

function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}


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
  const grid: SudokuGrid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))
  solveSudoku(grid, () => {})

  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50,
  }[difficulty]

  for (let i = 0; i < cellsToRemove; i++) {
    let row, col
    do {
      row = Math.floor(Math.random() * 9)
      col = Math.floor(Math.random() * 9)
    } while (grid[row][col] === null)
    grid[row][col] = null
  }

  return grid
}

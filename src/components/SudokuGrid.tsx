import type React from "react"
import type { SudokuGrid as SudokuGridType } from "../utils/sudokuSolver"

interface SudokuGridProps {
  grid: SudokuGridType
  onCellChange: (row: number, col: number, value: number | null) => void
  highlightedCell: [number, number] | null
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, onCellChange, highlightedCell }) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="grid grid-cols-9 gap-0 border-2 border-green-500 bg-gray-900 p-2 rounded-lg shadow-lg shadow-green-500/20">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square w-full min-w-[48px] flex items-center justify-center ${
                rowIndex % 3 === 2 && rowIndex !== 8
                  ? "border-b-2 border-b-green-500"
                  : "border-b border-gray-700"
              } ${
                colIndex % 3 === 2 && colIndex !== 8
                  ? "border-r-2 border-r-green-500"
                  : "border-r border-gray-700"
              } ${
                highlightedCell && highlightedCell[0] === rowIndex && highlightedCell[1] === colIndex
                  ? "bg-green-900"
                  : "bg-gray-800"
              } transition-colors duration-300`}
            >
              <input
                type="number"
                min="1"
                max="9"
                value={cell || ""}
                onChange={(e) => {
                  const value = e.target.value ? Number.parseInt(e.target.value, 10) : null
                  onCellChange(rowIndex, colIndex, value)
                }}
                className="w-full h-full text-center focus:outline-none bg-transparent text-green-500 font-mono text-sm md:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SudokuGrid
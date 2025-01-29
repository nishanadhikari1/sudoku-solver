import type React from "react"

interface ControlPanelProps {
  onGeneratePuzzle: (difficulty: "easy" | "medium" | "hard") => void
  onSolvePuzzle: () => void
  onClearPuzzle: () => void
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onGeneratePuzzle, onSolvePuzzle, onClearPuzzle }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold text-green-500">Generate Problems</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => onGeneratePuzzle("easy")}
          className="px-4 py-2 bg-gray-800 text-green-500 rounded shadow-md hover:bg-gray-700 transition-colors duration-300 border border-green-500"
        >
          Easy
        </button>
        <button
          onClick={() => onGeneratePuzzle("medium")}
          className="px-4 py-2 bg-gray-800 text-green-500 rounded shadow-md hover:bg-gray-700 transition-colors duration-300 border border-green-500"
        >
          Medium
        </button>
        <button
          onClick={() => onGeneratePuzzle("hard")}
          className="px-4 py-2 bg-gray-800 text-green-500 rounded shadow-md hover:bg-gray-700 transition-colors duration-300 border border-green-500"
        >
          Hard
        </button>
      </div>
      <button
        onClick={onSolvePuzzle}
        className="px-4 py-2 bg-green-600 text-gray-900 rounded shadow-md hover:bg-green-500 transition-colors duration-300"
      >
        Solve
      </button>
      <button
        onClick={onClearPuzzle}
        className="px-4 py-2 bg-gray-800 text-green-500 rounded shadow-md hover:bg-gray-700 transition-colors duration-300 border border-green-500"
      >
        Clear
      </button>
    </div>
  )
}

export default ControlPanel


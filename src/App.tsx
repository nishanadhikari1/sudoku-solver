import type React from "react"
import { useState, useEffect, useCallback } from "react"
import SudokuGrid from "./components/SudokuGrid"
import ControlPanel from "./components/ControlPanel"
import SolvingStepsPanel from "./components/SolvingStepsPanel"
import { type SudokuGrid as SudokuGridType, type SolveStep, solveSudoku, generateSudoku } from "./utils/sudokuSolver"

const App: React.FC = () => {
  const [grid, setGrid] = useState<SudokuGridType>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  )
  const [steps, setSteps] = useState<SolveStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1)
  const [highlightedCell, setHighlightedCell] = useState<[number, number] | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleCellChange = (row: number, col: number, value: number | null) => {
    const newGrid = grid.map((r) => [...r])
    newGrid[row][col] = value
    setGrid(newGrid)
    setMessage(null)
  }

  const handleGeneratePuzzle = (difficulty: "easy" | "medium" | "hard") => {
    const newGrid = generateSudoku(difficulty)
    setGrid(newGrid)
    setSteps([])
    setCurrentStepIndex(-1)
    setMessage(null)
  }

  const handleSolvePuzzle = useCallback(() => {
    setSteps([])
    setCurrentStepIndex(-1)
    setMessage(null)

    const gridCopy = grid.map((row) => [...row])
    const allSteps: SolveStep[] = []

    const stepCallback = (step: SolveStep) => {
      allSteps.push(step)
    }

    const isSolved = solveSudoku(gridCopy, stepCallback)

    if (!isSolved) {
      setMessage({ text: "Puzzle is unsolvable!", type: 'error' })
      setSteps([])
      return
    }

    setSteps(allSteps)
  }, [grid])

  const handleClearPuzzle = () => {
    setGrid(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(null)),
    )
    setSteps([])
    setCurrentStepIndex(-1)
    setMessage(null)
  }

  useEffect(() => {
    if (steps.length > 0 && currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prevIndex) => {
          const newIndex = prevIndex + 1
          const currentStep = steps[newIndex]
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) => [...row])
            newGrid[currentStep.row][currentStep.col] = currentStep.value
            return newGrid
          })
          setHighlightedCell([currentStep.row, currentStep.col])
          return newIndex
        })
      }, 50)

      return () => clearTimeout(timer)
    } else if (currentStepIndex === steps.length - 1 && steps.length > 0) {
      setHighlightedCell(null)
      setMessage({ text: "Puzzle solved successfully!", type: 'success' })
    }
  }, [steps, currentStepIndex])

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sudoku Solver</h1>
        <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center space-y-8">
            <SudokuGrid grid={grid} onCellChange={handleCellChange} highlightedCell={highlightedCell} />
            <ControlPanel
              onGeneratePuzzle={handleGeneratePuzzle}
              onSolvePuzzle={handleSolvePuzzle}
              onClearPuzzle={handleClearPuzzle}
            />
            {message && (
              <div 
                className={`w-full p-4 rounded-lg text-center font-medium mt-4 ${
                  message.type === 'success' 
                    ? 'bg-green-900/50 text-green-400' 
                    : 'bg-red-900/50 text-red-400'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
          <SolvingStepsPanel steps={steps} currentStepIndex={currentStepIndex} />
        </div>
      </div>
    </div>
  )
}

export default App
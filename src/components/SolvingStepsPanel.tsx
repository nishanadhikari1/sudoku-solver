import type React from "react"
import { useEffect, useRef } from "react"
import type { SolveStep } from "../utils/sudokuSolver"

interface SolvingStepsPanelProps {
  steps: SolveStep[]
  currentStepIndex: number
}

const SolvingStepsPanel: React.FC<SolvingStepsPanelProps> = ({ steps, currentStepIndex }) => {
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("Steps updated:", steps)
    if (stepsRef.current) {
      stepsRef.current.scrollTop = stepsRef.current.scrollHeight
    }
  }, [steps]) 

  useEffect(() => {
    if (stepsRef.current) {
      stepsRef.current.scrollTop = stepsRef.current.scrollHeight
    }
  }, [currentStepIndex]) 

  return (
    <div className="w-80 h-[600px] bg-gray-900 rounded-3xl p-4 shadow-lg relative overflow-hidden border border-green-500">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl border-b border-x border-green-500"></div>
      <div className="w-full h-full bg-gray-900 rounded-2xl p-4 overflow-hidden flex flex-col justify-start items-center">
        <h2 className="text-xl font-bold mb-4 text-green-500">Solving Steps</h2>
        <div
          ref={stepsRef}
          className="flex-1 overflow-y-auto font-mono text-sm pr-2 custom-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none", 
            scrollBehavior: "smooth", 
          }}
        >
          {steps.slice(0, currentStepIndex + 1).map((step, index) => (
            <div
              key={index}
              className={`mb-2 ${step.isBacktrack ? "text-red-500" : "text-green-500"}`}
            >
              {step.isBacktrack ? "[-] Backtrack: " : "[+] Try: "}({step.row + 1}, {step.col + 1}) = {step.value || "X"}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SolvingStepsPanel

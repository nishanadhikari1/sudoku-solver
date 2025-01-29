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
    <div className="w-96 h-[700px] bg-gray-800 rounded-[45px] p-4 shadow-xl relative overflow-hidden border-8 border-gray-700">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl flex items-center justify-center gap-2">
        <div className="w-12 h-2 bg-gray-700 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
      </div>
      <div className="mt-2 mb-4 px-4 flex justify-between text-xs text-green-500">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>
      <div className="w-full h-[calc(100%-4rem)] bg-gray-900 rounded-3xl p-4 overflow-hidden flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-green-500 text-center">Solving Steps</h2>
        <div
          ref={stepsRef}
          className="flex-1 overflow-y-auto font-mono text-sm px-3 custom-scrollbar space-y-3"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          {steps.slice(0, currentStepIndex + 1).map((step, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                step.isBacktrack 
                  ? "bg-red-900/20 text-red-500 border border-red-800" 
                  : "bg-green-900/20 text-green-500 border border-green-800"
              }`}
            >
              <span className="font-medium">
                {step.isBacktrack ? "[-] Backtrack: " : "[+] Try: "}
              </span>
              <span>
                ({step.row + 1}, {step.col + 1}) = {step.value || "X"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
    </div>
  )
}

export default SolvingStepsPanel
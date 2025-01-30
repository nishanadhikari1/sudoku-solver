# Sudoku Solver

A modern web-based Sudoku solver built with React, TypeScript, and Tailwind CSS. This application allows users to input Sudoku puzzles, solve them automatically, and visualize the solving process step by step.


## Features

- 🎮 Interactive Sudoku grid with input validation
- 🎲 Generate new puzzles with different difficulty levels
- ⚡ Real-time solving visualization
- 🔄 Step-by-step solution display
- 🧮 Backtracking algorithm implementation

## Technologies Used

- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nishanadhikari1/sudoku-solver.git
cd sudoku-solver
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### Solving a Puzzle

1. Enter numbers manually into the grid, or use the "Generate" button to create a new puzzle
2. Click "Solve" to start the solving process
3. Watch as the algorithm fills in the solution step by step
4. Use "Clear" to reset the grid

### Generating Puzzles

Choose from three difficulty levels:
- Easy
- Medium
- Hard

## How It Works

The solver uses a backtracking algorithm to find the solution:

1. Find an empty cell
2. Try numbers 1-9 in the cell
3. Check if the number is valid in the current position
4. If valid, recursively attempt to fill the rest of the grid
5. If the current path doesn't lead to a solution, backtrack and try the next number

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch 
5. Open a Pull Request

## Contact

Nishan Adhikari - adhikarin537@gmail.com

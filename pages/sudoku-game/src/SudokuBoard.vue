<template>
  <div>
    <h1>Sudoku Game</h1>
    <div class="sudoku-board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <input v-for="(cell, colIndex) in row" :key="colIndex" 
               :class="{
                 'correct': isCorrect(rowIndex, colIndex),
                 'wrong': isWrong(rowIndex, colIndex),
                 'readonly-cell': puzzle[rowIndex][colIndex] !== 0
               }"
               :value="cell || ''" 
               :readonly="puzzle[rowIndex][colIndex] !== 0" 
               @input="updateBoard(rowIndex, colIndex, $event.target.value)"
               class="sudoku-cell" 
               type="number" min="1" max="9"/>
      </div>
    </div>
    <button @click="generatePuzzle">Generate New Puzzle</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],    // Current user-filled board
      puzzle: [],   // The Sudoku puzzle with empty cells
      solution: []  // The full Sudoku solution (generated)
    };
  },
  methods: {
    generatePuzzle() {
      // Generate a complete solution and remove numbers to create a puzzle
      const solvedBoard = this.generateSolvedBoard();
      const puzzleBoard = this.removeNumbers(solvedBoard, 40); // Adjust number of cells to remove

      this.solution = solvedBoard; // Save solution for checking correctness
      this.puzzle = puzzleBoard;   // Save puzzle for readonly cell reference
      this.board = puzzleBoard.map(row => row.slice()); // Copy puzzle for user to interact
    },
    generateSolvedBoard() {
      // Generate a full Sudoku board using a backtracking algorithm
      const board = Array.from({ length: 9 }, () => Array(9).fill(0));
      this.fillBoard(board);  // Use recursive backtracking to fill board
      return board;
    },
    fillBoard(board) {
      // Backtracking algorithm to fill the board with a valid Sudoku solution
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const isValid = (board, row, col, num) => {
        for (let x = 0; x < 9; x++) {
          if (board[row][x] === num || board[x][col] === num) return false;
          const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
          const boxCol = 3 * Math.floor(col / 3) + (x % 3);
          if (board[boxRow][boxCol] === num) return false;
        }
        return true;
      };
      const fillCell = (row, col) => {
        if (row === 9) return true; // End of board
        const nextRow = col === 8 ? row + 1 : row;
        const nextCol = col === 8 ? 0 : col + 1;
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillCell(nextRow, nextCol)) return true;
            board[row][col] = 0; // Backtrack
          }
        }
        return false;
      };
      fillCell(0, 0);
    },
    removeNumbers(board, count) {
      // Randomly remove numbers from a filled board to create the puzzle
      const puzzle = board.map(row => row.slice());
      let cellsRemoved = 0;
      while (cellsRemoved < count) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
          puzzle[row][col] = 0;
          cellsRemoved++;
        }
      }
      return puzzle;
    },
    updateBoard(row, col, value) {
      // Update the board as the user inputs numbers
      const val = value ? parseInt(value) : '';
      this.$set(this.board[row], col, val);
    },
    isCorrect(row, col) {
      // Check if the user input matches the solution
      const userValue = this.board[row][col];
      const correctValue = this.solution[row][col];
      return userValue === correctValue && userValue !== '';
    },
    isWrong(row, col) {
      // Check if the user input is incorrect
      const userValue = this.board[row][col];
      const correctValue = this.solution[row][col];
      return userValue !== '' && userValue !== correctValue;
    }
  },
  mounted() {
    this.generatePuzzle(); // Generate puzzle when component is mounted
  }
};
</script>

<style>
.sudoku-board {
  display: grid;
  grid-template-columns: repeat(9, 40px);
  grid-template-rows: repeat(9, 40px);
  gap: 2px;
}
.sudoku-cell {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ddd;
}
.sudoku-cell.correct {
  background-color: #d4edda; /* Light green for correct answers */
}
.sudoku-cell.wrong {
  background-color: #f8d7da; /* Light red for wrong answers */
}
.sudoku-cell.readonly-cell {
  background-color: #e9ecef; /* Light gray for readonly cells */
}
.row {
  display: contents;
}
</style>

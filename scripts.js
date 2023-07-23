    const board = [null, null, null, null, null, null, null, null, null];
        let currentPlayer = 'X';
        let player1Wins = 0;
        let player2Wins = 0;
      
        function checkWinner() {
          const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
          ];
      
          for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              highlightWinningCells([a, b, c]); // Highlight the winning cells
              return board[a];
            }
          }
      
          if (!board.includes(null)) {
            return 'tie';
          }
      
          return null;
        }
      
        function highlightWinningCells(cells) {
          cells.forEach(index => {
            document.querySelector(`[data-index="${index}"]`).classList.add('winning-cell');
          });
        }
      
        function boxClicked(event) {
          const cell = event.target;
          const index = cell.dataset.index;
          if (board[index] === null) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
      
            const winner = checkWinner();
            if (winner) {
              // Delay before showing the alert and resetting the game
              setTimeout(() => {
                if (winner === "tie") {
                  alert("It's a tie!");
                } else {
                  alert(`Player ${winner} wins!`);
                }
                resetGame(); // Reset the game after showing the alert
              }, 100);
            } else {
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
          }
        }
      
        function resetGame() {
          board.fill(null);
          const cells = document.querySelectorAll('.cell');
          cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell'); // Remove the winning cell highlight
          });
          currentPlayer = 'X';
        }


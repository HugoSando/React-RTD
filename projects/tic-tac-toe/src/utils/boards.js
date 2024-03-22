import { WinConditions } from '../constants/constants.js'

export const CheckWinner = (boardToCheck) => {
  // Check if there is a winner with the win conditions and the board state
  for (const [a, b, c] of WinConditions) {
    if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a]
    }

  }
  // If there is no winner, return null
  return null
}
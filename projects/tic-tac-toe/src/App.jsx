import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants/constants.js'
import { CheckWinner } from './utils/boards.js'
import Winner from './components/Winner.jsx'


function App() {

  // Create a state for the board
  const [board, setBoard] = useState(
    // get the match history from the local storage
    JSON.parse(window.localStorage.getItem('matchHistory')) ||
    Array(9).fill(null))

  // Create a state for the turn
  const [turn, setTurn] = useState(
    // get the turn from the local storage
    JSON.parse(window.localStorage.getItem('turn')) ||
    TURNS.X)

  //create an state for the winner where the winner is null, x, o or false for a draw 
  const [winner, setWinner] = useState(null)

  // Create a function to update the board
  const updateBoard = (index) => {
    // If the square is already filled or there is a winner, return
    if (board[index] || winner) {
      return
    }
    // Create a new board with the updated square
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Change the turn to the next player
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // save match history
    window.localStorage.setItem('matchHistory', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    // Check if there is a winner
    const newWinner = CheckWinner(newBoard)
    // If there is a winner, set the winner and throw confetti
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    }
    // Check if there is a draw
    if (newBoard.every((square) => square !== null)) {
      setWinner(false)
    }
  }

  // Create a function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    // clear the local storage
    window.localStorage.removeItem('matchHistory')
    window.localStorage.removeItem('turn')
  }

  return (
  <main className="board">
    <h1>Tic tac toe</h1>
    <section className="game">
      {
        board.map((value, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {value}
              </Square>
            )}
        )
      }
    </section>
    
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    <Winner
      winner={winner}
      resetGame={resetGame}
    />

    <button onClick={resetGame}>
      Restart
    </button>

  </main>
  )
}

export default App
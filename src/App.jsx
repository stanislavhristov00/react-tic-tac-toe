import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

import GameBoard  from "./components/GameBoard"
import Player from "./components/Player"
import Log from './components/Log';
import GameOver from './components/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(board, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =  board[combination[0].row][combination[0].column];
    const secondSquareSymbol = board[combination[1].row][combination[1].column];
    const thirdSquareSymbol = board[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol && 
        secondSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveBoard(gameTurns) {
  let board = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      board[square.row][square.col] = player;
  }

  return board;
}

function App() {
  const [ players, setPlayers ]= useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const board = deriveBoard(gameTurns);
  const winner = deriveWinner(board, players);
  const hasDraw = gameTurns.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...gameTurns
      ];

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(oldPlayers => {
      return {
        ...oldPlayers,
        [symbol]: newName
      };
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
          initialName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer == 'X'}
          onChangeName={handlePlayerNameChange} 
        />
        <Player 
          initialName={PLAYERS.O} 
          symbol="O" 
          isActive={activePlayer == 'O'}
          onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board={board} />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App

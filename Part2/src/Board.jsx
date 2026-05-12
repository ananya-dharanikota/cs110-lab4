import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((sq) => sq !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}!`;
  } else if (isBoardFull) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    const nextWinner = calculateWinner(nextSquares);
    if (nextWinner) {
      setScores((prev) => ({ ...prev, [nextWinner]: prev[nextWinner] + 1 }));
    }
  }

  function handleNewGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div className="scoreboard">
        <div className="score-card">
          <div className="label">X</div>
          <div className="value">{scores.X}</div>
        </div>
        <div className="score-card">
          <div className="label">O</div>
          <div className="value">{scores.O}</div>
        </div>
      </div>

      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <button className="new-game" onClick={handleNewGame}>
        New Game
      </button>
    </>
  );
}

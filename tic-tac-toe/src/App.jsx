import { useState } from 'react'
import './App.css'

function Square({value, clickedBox}) {
  return <button className='square' onClick={clickedBox}>{value}</button>
};

function App() {
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));
    setPlayer1(formObj.player1);
    setPlayer2(formObj.player2);
    setCurrentPlayer(true);
    setSquares(Array(9).fill(null));
  };
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === 'player1') {
      setPlayer1(value);
    } else if (name === 'player2') {
      setPlayer2(value);
    };
  };
  
  const handleClick = (idx) => {
    if(squares[idx] || findWinner(squares)) {
      return;
    };
    
    const next = squares.slice();
    if(currentPlayer) {
      next[idx] = 'X';
    } else {
      next[idx] = 'O';
    };
    
    setSquares(next);
    setCurrentPlayer(!currentPlayer);
  };
  
  const findWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6],
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6]
    ];
    for(let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      };
    };
    return null;
  };

  const winner = findWinner(squares);
  let winnerName = '';
  if(winner) {
    winnerName = 'Winner: ' + (winner === 'X' ? player1 : player2);
  } else if (!squares.includes(null)) {
    winnerName = 'TIE!';
  } else {
    winnerName = 'Next player: ' + (currentPlayer ? player1 : player2);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCurrentPlayer(true);
    setPlayer1('Player 1');
    setPlayer2('Player 2');
    setCurrentPlayer('X');
    setSquares(Array(9).fill(null));
  };

  return (
    <>
    <div className='container'>
      <h1 id='title'>Tic Tac Toe</h1>

      <form  id="form" onSubmit={handleSubmit}>
        <div id='form-names'>
        <label htmlFor="name"></label>
        <input  id="name1" type="text"  value={player1} name='player1' onChange={handleChange}/>
        <label htmlFor="name"></label>
        <input  id="name2" type="text"  value={player2} name='player2' onChange={handleChange} />
        </div>
          
        <input onClick={handleSubmit} id='submit' type="submit" value={'Submit'} />
      </form>

      <div className='winner'>{winnerName}</div>

      <div className='board'>

        <div className='row1'>
          <Square value={squares[0]} clickedBox={() => handleClick(0)} />
          <Square value={squares[1]} clickedBox={() => handleClick(1)}/>
          <Square value={squares[2]} clickedBox={() => handleClick(2)}/>
        </div>

        <div className='row2'>
          <Square value={squares[3]} clickedBox={() => handleClick(3)}/>
          <Square value={squares[4]} clickedBox={() => handleClick(4)}/>
          <Square value={squares[5]} clickedBox={() => handleClick(5)}/>
        </div>

        <div className='row3'>
          <Square value={squares[6]} clickedBox={() => handleClick(6)}/>
          <Square value={squares[7]} clickedBox={() => handleClick(7)}/>
          <Square value={squares[8]} clickedBox={() => handleClick(8)}/>
        </div>

      </div>
    </div> 

    <button id="reset" onClick={handleReset}>Reset</button>

    </>
  )
}

export default App;

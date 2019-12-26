import React from 'react';
import ChessBoard from './components/ChessBoard/ChessBoard';
import './global.scss';
import ChessBoardModel from './domain/ChessBoardModel';

const App: React.FC = () => {
  let board : ChessBoardModel = new ChessBoardModel(8);
  
  return (
    <div className="App">
      <div style={{ margin:'auto', display:'flex'}}>
        <button className='btn-primary' onClick={() =>{alert('kaczki')}}>Hello</button>
        <input type='number'></input>
        <button className='btn-secondary'>World</button>
      </div>
      <h1>Hello saas!</h1>
      <ChessBoard boardModel={board} />
    </div>
  );
}

export default App;

import React from 'react';
import ChessBoard from './components/ChessBoard/ChessBoard';
import './global.scss';
import { Provider } from "react-redux";
import { Store } from "redux";
import { AppState } from 'store/index'
import BoardSettingsPanel from 'components/BoardSettingsPanel/BoardSettingsPanel';
interface IProps {
  store: Store<AppState, any>;
}

const App: React.FC<IProps> = (props) => {

  return (
    <Provider store={props.store}>
      <div className="App">
        <h1>ChessKnight</h1>
        <span>Find the shortest path</span>
        <main>
          <div className="main-container">
            <BoardSettingsPanel></BoardSettingsPanel>
            <ChessBoard />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;

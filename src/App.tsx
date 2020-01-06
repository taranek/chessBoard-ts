import React from 'react';
import ChessBoard from './components/ChessBoard/ChessBoard';
import './global.scss';
import { Provider } from "react-redux";
import {Store } from "redux";
import {AppState} from 'store/index'
import BoardSettingsPanel from 'components/BoardSettingsPanel/BoardSettingsPanel';
interface IProps {
  store: Store<AppState,any>;
} 

const App: React.FC<IProps> = (props) => {
  
  return (
    <Provider store={props.store}>
    <div className="App">
      <div className="main-container">
        <BoardSettingsPanel></BoardSettingsPanel>
        <ChessBoard/>
      </div>
      
    </div>
    </Provider>
  );
}

export default App;

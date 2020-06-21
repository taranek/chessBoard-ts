import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { mainReducer } from 'store/system/reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={createStore(mainReducer)} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

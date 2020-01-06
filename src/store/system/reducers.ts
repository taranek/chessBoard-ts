// src/store/system/reducers.ts
import { SystemState, SystemActionTypes, UPDATE_BOARD, UPDATE_START_POSITION, UPDATE_POSITION_LISTENER, UPDATE_END_POSITION, UPDATE_KNIGHT } from './types'
import Knight from 'domain/Knight';
import ChessBoardModel from 'domain/ChessBoardModel';

const initialState: SystemState = {
  knight:new Knight(1,1),
  boardModel: new ChessBoardModel(5),
  start:null,
  end:null,
  positionListener:null,
}
export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case UPDATE_BOARD: {
      return {
        ...state,
        boardModel: action.payload,
      }
    }
    case UPDATE_START_POSITION: {      
      return {
        ...state,
        start: action.payload,
      }
    }
    case UPDATE_END_POSITION: {
      return {
        ...state,
        end: action.payload,
      }
    }
    case UPDATE_KNIGHT: {
      return {
        ...state,
        knight: action.payload,
      }
    }
    case UPDATE_POSITION_LISTENER: {
      return {
        ...state,
        positionListener: action.payload,
      }
    }
    default:
      return state
  }
}
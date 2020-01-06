import Knight from "domain/Knight"
import Cords from 'domain/Cords'
import ChessBoardModel from "domain/ChessBoardModel"
import {Nullable} from 'generics/Nullable'

// src/store/system/types.ts
export interface SystemState {
  boardModel:ChessBoardModel,
  knight:Knight,
  start?:Nullable<Cords>,
  end?:Nullable<Cords>,
  positionListener?: Nullable<PositionType>,
}
// src/store/system/types.ts
export const UPDATE_SESSION = 'UPDATE_SESSION'
export const UPDATE_KNIGHT = 'UPDATE_KNIGHT'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_START_POSITION = 'UPDATE_START_POSITION'
export const UPDATE_END_POSITION = 'UPDATE_END_POSITION'
export const UPDATE_POSITION_LISTENER = 'UPDATE_POSITION_LISTENER'

export enum PositionType{
  Start,
  End
}

interface UpdatePositionListener{
  type: typeof UPDATE_POSITION_LISTENER,
  payload:Nullable<PositionType>,
}
interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: SystemState
}
interface UpdateBoardAction {
  type: typeof UPDATE_BOARD
  payload: ChessBoardModel
}
interface UpdateKnightAction {
  type: typeof UPDATE_KNIGHT
  payload: Knight
}
interface UpdateStartPositionAction {
  type: typeof UPDATE_START_POSITION
  payload: Nullable<Cords>,
}
interface UpdateEndPositionAction {
  type: typeof UPDATE_END_POSITION
  payload: Nullable<Cords>,
}
export type SystemActionTypes = (UpdateSessionAction | UpdateBoardAction | UpdateKnightAction |
                                 UpdateStartPositionAction | UpdateEndPositionAction | UpdatePositionListener)
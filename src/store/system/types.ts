import Knight from "domain/Knight"
import Cords from 'domain/Cords'
import ChessBoardModel from "domain/ChessBoardModel"
import { Nullable } from 'generics/Nullable'

export interface AppState {
  boardModel: ChessBoardModel,
  knight: Knight,
  start?: Nullable<Cords>,
  end?: Nullable<Cords>,
  positionListener?: Nullable<PositionType>,
  solutionPath?: Array<Cords>
}

export const UPDATE_SESSION = 'UPDATE_SESSION'
export const UPDATE_KNIGHT = 'UPDATE_KNIGHT'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_SOLUTION_PATH = 'UPDATE_SOLUTION_PATH'
export const UPDATE_START_POSITION = 'UPDATE_START_POSITION'
export const UPDATE_END_POSITION = 'UPDATE_END_POSITION'
export const UPDATE_POSITION_LISTENER = 'UPDATE_POSITION_LISTENER'

export enum PositionType {
  Start,
  End
}

interface UpdatePositionListener {
  type: typeof UPDATE_POSITION_LISTENER,
  payload: Nullable<PositionType>,
}
interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: AppState
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
interface UpdateSolutionPath {
  type: typeof UPDATE_SOLUTION_PATH
  payload: Array<Cords>
}
export type AppActionTypes = (UpdateSessionAction | UpdateBoardAction | UpdateKnightAction |
  UpdateStartPositionAction | UpdateEndPositionAction | UpdatePositionListener | UpdateSolutionPath)
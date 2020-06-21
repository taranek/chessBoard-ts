import { ConnectedProps, connect } from "react-redux";
import ChessBoardModel from "domain/ChessBoardModel";
import { Nullable } from "generics/Nullable";
import Cords from "domain/Cords";
import Knight from "domain/Knight";
import { UPDATE_BOARD, UPDATE_SOLUTION_PATH } from "store/system/types";


type PropsFromRedux = ConnectedProps<typeof connector>

interface RootState {
  boardModel: ChessBoardModel,
  start: Nullable<Cords>,
  end: Nullable<Cords>
  knight: Knight,
}

const mapDispatch = {
  updateBoard: (size: number) => {
    let board = new ChessBoardModel(size);
    return { type: UPDATE_BOARD, payload: board };
  },
  updateSolutionPath: (solutionPath: Array<Cords>) => {
    return { type: UPDATE_SOLUTION_PATH, payload: solutionPath };
  }
}
const mapState = (state: RootState) => (
  {
    boardModel: state.boardModel,
    start: state.start,
    end: state.end,
    knight: state.knight,
  }
)

export const connector = connect(
  mapState,
  mapDispatch
)
export type Props = PropsFromRedux & {
  boardModel: ChessBoardModel,
}
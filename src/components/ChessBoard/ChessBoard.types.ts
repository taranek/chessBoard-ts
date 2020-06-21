import { ConnectedProps, connect } from "react-redux"
import ChessBoardModel from "domain/ChessBoardModel"
import Cords from "domain/Cords"

type PropsFromRedux = ConnectedProps<typeof connector>

export type Props = PropsFromRedux & {
  boardModel: ChessBoardModel,
  solutionPath: Array<Cords>,
}
interface RootState {
  boardModel: ChessBoardModel,
  solutionPath: Array<Cords>,
}

const mapState = (state: RootState) => ({
  boardModel: state.boardModel,
  solutionPath: state.solutionPath,
})

export const connector = connect(
  mapState
)

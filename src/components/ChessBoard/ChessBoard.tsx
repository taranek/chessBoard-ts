import React, { useRef, useEffect, useState } from 'react';
import ChessBoardModel from 'domain/ChessBoardModel'
import Square from 'components/Square/Square';
import './ChessBoard.scss';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux'
import useWindowSize from 'hooks/useWindowSize';
import Cords from 'domain/Cords';

// type ChessBoardProps = {
//   boardModel: ChessBoardModel,
// }
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
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
const mapDispatch = {
  logBoard: () => { console.log('props.boardModel.size') },
}
const connector = connect(
  mapState,
  mapDispatch
)


const ChessBoard: React.FC<Props> = (props: Props) => {
  const [squareHeight, setSquareHeight] = useState(100);
  const [windowWidth] = useWindowSize();
  const squareRef = useRef(document.createElement("div"));
  const boardModel = props.boardModel;
  const solutionPath = props.solutionPath;
  var width = 0;
  useEffect(() => {
    width = squareRef.current.offsetWidth;
    setSquareHeight(width);
  },
    [boardModel, windowWidth, solutionPath])


  const SquareWrapper = styled.div`
    height:${squareHeight}px;
    flex-basis:${100 / boardModel.size}%`;

  return (
    <div className='chessBoard-container'>
      {boardModel.graph.nodes.map((node) => (
        <SquareWrapper ref={squareRef} key={String(JSON.stringify(node.cords) + '-container')}>
          <Square cords={node.cords} key={String(JSON.stringify(node.cords))} />
        </SquareWrapper>)
      )}
    </div>
  );
}

export default connector(ChessBoard);

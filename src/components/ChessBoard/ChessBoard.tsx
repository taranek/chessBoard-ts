import React, { useRef, useEffect, useState } from 'react';
import Square from 'components/Square/Square';
import './ChessBoard.scss';
import useWindowSize from 'hooks/useWindowSize';
import { SquareWrapper } from 'components/Square/Square.styles';
import { Props, connector } from './ChessBoard.types';


const ChessBoard: React.FC<Props> = (props: Props) => {
  const [squareHeight, setSquareHeight] = useState(100);
  const [windowWidth] = useWindowSize();
  const squareRef = useRef(document.createElement("div"));
  const boardModel = props.boardModel;
  const solutionPath = props.solutionPath;
  useEffect(() => {
    if (!!squareRef && !!squareRef.current) {
      const width = squareRef.current.offsetWidth;
      setSquareHeight(width);
    }
  },
    [boardModel, windowWidth, solutionPath, squareRef])


  return (
    <div className='chessBoard-container'>
      {boardModel.graph.nodes.map((node, index) => (
        <SquareWrapper ref={index === 0 ? squareRef : null} key={String(JSON.stringify(node.cords) + '-container')} boardSize={boardModel.size} squareHeight={squareHeight}>
          <Square cords={node.cords} key={String(JSON.stringify(node.cords))} />
        </SquareWrapper>)
      )}
    </div>
  );
}

export default connector(ChessBoard);

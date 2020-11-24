import * as React from 'react';
import Square from 'components/Square/Square';
import './ChessBoard.scss';
import useWindowSize from 'hooks/useWindowSize';
import { SquareWrapper } from 'components/Square/Square.styles';
import { Props, connector } from './ChessBoard.types';
import { useWorker } from "@koale/useworker";


const ChessBoard: React.FC<Props> = ({ boardModel, solutionPath }: Props) => {

  const [squareHeight, setSquareHeight] = React.useState(100);
  const [windowWidth] = useWindowSize();
  const squareRef = React.useRef(document.createElement("div"));

  React.useEffect(() => {
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

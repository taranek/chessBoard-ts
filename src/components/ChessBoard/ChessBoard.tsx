import React, {useRef, useEffect, useState} from 'react';
import ChessBoardModel from 'domain/ChessBoardModel'
import Square from 'components/Square/Square';
import './ChessBoard.scss';
import styled from 'styled-components';
type ChessBoardProps = {
  boardModel: ChessBoardModel,
}


const ChessBoard: React.FC<ChessBoardProps> = ({boardModel}:ChessBoardProps) => {
  const [squareHeight, setSquareHeight] = useState(100);
  const squareRef = useRef(document.createElement("div"));
  useEffect(() =>{
    if(squareRef!==null){
      let width = squareRef.current.offsetWidth;
      setSquareHeight(width);
    }
  },[])
  const FlexContainer = styled.div`
    flex-basis:${100/boardModel.size}%;
    `
  const SquareWrapper = styled.div`
    height:${squareHeight}px;
    flex-basis:${100/boardModel.size}%;
    `
  // Solution();
  console.log(boardModel.graph);
  return (
    <React.Fragment>
      Hello ChessBoard!
      <FlexContainer className='chessBoard-container'>
        {boardModel.graph.nodes.map((node) =>(
          <SquareWrapper ref={squareRef}  key={String(JSON.stringify(node.cords)+'-container')}>
            <Square cords={node.cords} key={String(JSON.stringify(node.cords))}/>
          </SquareWrapper>)
        )}
      </FlexContainer>
    </React.Fragment>
  );
}

export default ChessBoard;

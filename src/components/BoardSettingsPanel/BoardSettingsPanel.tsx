import React from 'react';
import ChessBoardModel from 'domain/ChessBoardModel'
import { connect, ConnectedProps } from 'react-redux'
import {UPDATE_BOARD, PositionType} from 'store/system/types';
import {Nullable} from 'generics/Nullable'
import Cords from 'domain/Cords';
import PositionSettings from 'components/PositionSettings/PositionSettings'
import Solution from 'domain/Solution'
import Knight from 'domain/Knight';
import KnightSettings from 'components/KnightSettings/KnightSettings';
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  boardModel:ChessBoardModel,
}
interface RootState {
  boardModel:ChessBoardModel,
  start: Nullable<Cords>,
  end: Nullable<Cords>
  knight:Knight,
}

const mapDispatch = {
  updateBoard: (size:number) =>{
    let board = new ChessBoardModel(size);
    return {type:UPDATE_BOARD, payload:board};
  }
}
const connector = connect(
  mapState,
  mapDispatch
)
function ProvideSolution(chessBoardSize:number,start:Nullable<Cords>,end:Nullable<Cords>,knight:Knight){
let startPosition:Cords = new Cords(0,0);
let endPosition:Cords = new Cords(0,0);

  if(start !==null){
    startPosition = new Cords(start.x,start.y);
    
  }
  if(end !==null){
    endPosition = new Cords(end.x,end.y);
  }

  return Solution(chessBoardSize,startPosition,endPosition,knight);
}

const BoardSettingsPanel: React.FC<Props> = (props:Props) => {
  let knight :Knight = props.knight;
  let boardModel:ChessBoardModel = props.boardModel;
  let start:Nullable<Cords> = props.start;
  let end:Nullable<Cords> = props.end;
  return (
      <div style={{boxSizing: 'border-box'}}>
        <div className="settings-container">
          <span>
            ChessBoard size:
          </span>
        <input 
          type='number'
          defaultValue={props.boardModel.size}
          onChange = { (e) => { props.updateBoard(Number(e.target.value)) }}
        ></input>
        </div>
        <PositionSettings name={PositionType.Start} position={props.start}></PositionSettings>
        <PositionSettings name={PositionType.End} position={props.end}></PositionSettings>
        <KnightSettings></KnightSettings>
        <button className="btn-primary" disabled={props.start===null || props.end ===null} onClick={()=>(ProvideSolution(boardModel.size,start,end,knight))}>Solve it!</button>
      </div>
  );
}

function mapState(state: RootState){
  return {
    boardModel:state.boardModel,
    start: state.start,
    end: state.end,
    knight: state.knight,
  };
}

export default connector(BoardSettingsPanel);

import React, {useState} from 'react';
import Cords from 'domain/Cords';
import 'components/Square/Square.scss'
import knight from 'assets/knight.svg'
import knight_opacity from 'assets/knight_opacity.svg'
import { connect, ConnectedProps } from 'react-redux'
import {UPDATE_START_POSITION, PositionType, UPDATE_END_POSITION} from 'store/system/types';
import {Nullable} from 'generics/Nullable'
import { isEqual } from "lodash";
import _ from 'lodash';
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  cords:Cords
}

interface RootState {
  cords:Cords,
  start:Nullable<Cords>,
  end:Nullable<Cords>,
  positionListener:Nullable<PositionType>,
  solutionPath:Array<Cords>
}

function mapState(state: RootState){
  return {
    positionListener: state.positionListener,
    start: state.start,
    end: state.end,
    solutionPath: state.solutionPath,
  };
}

const mapDispatch = {
  updateStart: (cords:Nullable<Cords>) =>{
    return {type:UPDATE_START_POSITION, payload:cords};
  },
  updateEnd: (cords:Nullable<Cords>) =>{
    return {type:UPDATE_END_POSITION, payload:cords};
  },
  
}
const connector = connect(
  mapState,
  mapDispatch
)


const Square: React.FC<Props> = (props:Props) =>{
  const startPosition = props.start;
  const endPosition = props.end;
  const positionListener = props.positionListener;  
  const cords = props.cords;
  const belongsToSolution = belongsToSolutionPath(props.solutionPath, props.cords);
  const isEven = (cords.x + cords.y)%2===0;
  const stylingClass = isEven ? 'square__even' : 'square__odd';
  const children = [];
  const [renderKnight,toggleRenderKnight] = useState((isEqual(props.start,cords) || (isEqual(props.end,cords))) && props.positionListener !==null);

  const toggleStartPosition = ()=>{
    if(startPosition === null || isEqual(startPosition,cords)){
      if(renderKnight){
        props.updateStart(null);
      }else{
        props.updateStart(cords);
      }
      toggleRenderKnight(!renderKnight)
    }
  }
  const toggleEndPosition = ()=>{
    if(endPosition === null || isEqual(endPosition,cords)){
      if(renderKnight){
        props.updateEnd(null);
      }else{
        props.updateEnd(cords);
      }
      toggleRenderKnight(!renderKnight)
    }
  }
  const setPosition = () =>{
    if(positionListener === PositionType.Start){
      toggleStartPosition();
    }
    if(positionListener === PositionType.End){
      toggleEndPosition();
    }
  }
  function belongsToSolutionPath(solutionPath:Array<Cords>, cords:Cords) : boolean {
    let result = false;
    props.solutionPath.forEach(solutionStep=>{
      if(solutionStep.x===cords.x && solutionStep.y===cords.y){
        result=true;
      }
    })
    return result;
  }
  if(renderKnight){
    children.push(
    <img src={knight} key='start-kinght' alt="knight chess icon" /> );
  }
  if(belongsToSolution){
    children.push(
    <img src={knight_opacity} key='path-kinght' alt="knight chess icon" /> );
  }
  return (<div className={`square ${stylingClass}`} onClick={setPosition} >
     {children}
  </div>)
}
export default connector(Square);

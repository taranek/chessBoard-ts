import React from 'react';
import Cords from 'domain/Cords';
import 'components/Square/Square.scss'
import { connect, ConnectedProps } from 'react-redux'
import {UPDATE_START_POSITION, PositionType, UPDATE_POSITION_LISTENER, UPDATE_END_POSITION} from 'store/system/types';
import {Nullable} from 'generics/Nullable'

import 'components/PositionSettings/PositionSettings.scss';
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  position:Nullable<Cords>,
  name:PositionType;
}

interface RootState {
  
}

function mapState(state: RootState){
  return {
  };
}

const mapDispatch = {
  updatePositionListener: (position:Nullable<PositionType>) =>{
    return {type:UPDATE_POSITION_LISTENER, payload:position};    
  },
  resetStartPosition: () =>({ type: UPDATE_START_POSITION, payload: null }),
  resetEndPosition: () =>({ type: UPDATE_END_POSITION, payload: null })
}
const connector = connect(
  mapState,
  mapDispatch
)


const PositionSettings: React.FC<Props> = (props:Props) =>{
  const position = props.position;
  const positionType = props.name;
  const name = PositionType[positionType];
  const positionInfo = [];
  function setListener(){
    if(positionType ===PositionType.Start){
      props.resetStartPosition();
    }
    if(positionType ===PositionType.End){
      props.resetEndPosition();
    }
    props.updatePositionListener(positionType);
  }

  if(position === null){
    positionInfo.push(<span key={name}> No {name} position set.</span>)
  }else{
    positionInfo.push(<span key={name}>Position {name} x:{position.x}, y:{position.y}</span>)
  }
  return (
    <div className='settings-container'>
      {positionInfo}
    <button className="btn-primary" onClick={setListener}> Set {name} position</button>
    </div>
  )
}
export default connector(PositionSettings);

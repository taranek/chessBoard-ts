import * as React from 'react';
import 'components/Square/Square.scss'
import { PositionType } from 'store/system/types';
import 'components/PositionSettings/PositionSettings.scss';
import { Props, connector } from './PositionSettings.types';


const PositionSettings: React.FC<Props> = (props: Props) => {
  const position = props.position;
  const positionType = props.name;
  const name = PositionType[positionType];
  const setListener = () => {
    if (positionType === PositionType.Start) {
      props.resetStartPosition();
    }
    if (positionType === PositionType.End) {
      props.resetEndPosition();
    }
    props.updatePositionListener(positionType);
  }

  const renderPositionInfo = () => {
    if (position === null) {
      return (<span key={name}> No {name} position set.</span>)
    }
    return (<span key={name}>Position {name} x:{position.x}, y:{position.y}</span>)

  }

  return (
    <div className='settings-container'>
      {renderPositionInfo()}
      <button type='button' className="btn-primary" disabled={!props.enableSetter} onClick={setListener}> Set {name} position</button>
    </div>
  )
}
export default connector(PositionSettings);

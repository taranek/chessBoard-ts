import React from 'react';
import 'components/Square/Square.scss'
import 'components/PositionSettings/PositionSettings.scss';
import { Props, connector } from './KnightSettings.types';

const KnightSettings: React.FC<Props> = (props: Props) => {
  const knight = props.knight;

  const handleChange = (event: any) => {
    const value = parseInt(event.target.value);
    const key = String(event.target.name);
    (knight as any)[key] = value;
    props.updateKnight(knight);
    console.log(knight)
  }

  return (
    <div className='settings-container'>
      <span>Knight parameters are: </span>
      <label htmlFor='knight-xMove'>x:</label>
      <input id='knight-xMove' name='xMove' type='number' defaultValue={knight.xMove} onChange={handleChange}>
      </input>
      <label htmlFor='knight-yMove'>y:</label>
      <input id='knight-yMove' name='yMove' type='number' defaultValue={knight.yMove} onChange={handleChange}>
      </input>
    </div>
  )
}
export default connector(KnightSettings);

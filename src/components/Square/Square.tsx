import React from 'react';
import Cords from 'domain/Cords';
import 'components/Square/Square.scss'
import knight from 'assets/knight.svg'
type SquareProps = {
  cords:Cords,
}
const Square: React.FC<SquareProps> = ({cords}:SquareProps) =>{
  let isEven = (cords.x + cords.y)%2===0;
  let stylingClass = isEven ? 'square__even' : 'square__odd';
  return <div className={`square ${stylingClass}`}>
     <img src={knight} alt="knight chess icon" />
  </div>
}
export default Square;

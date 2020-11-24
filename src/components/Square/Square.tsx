import * as React from 'react';
import Cords from 'domain/Cords';
import 'components/Square/Square.scss'
import knight from 'assets/knight.svg'
import { connect, ConnectedProps } from 'react-redux'
import { UPDATE_START_POSITION, PositionType, UPDATE_END_POSITION } from 'store/system/types';
import { Nullable } from 'generics/Nullable'
import { isEqual } from "lodash";
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  cords: Cords
}

interface RootState {
  cords: Cords,
  start: Nullable<Cords>,
  end: Nullable<Cords>,
  positionListener: Nullable<PositionType>,
  solutionPath: Array<Cords>
}

function mapState(state: RootState) {
  return {
    positionListener: state.positionListener,
    start: state.start,
    end: state.end,
    solutionPath: state.solutionPath,
  };
}

const mapDispatch = {
  updateStart: (cords: Nullable<Cords>) => {
    return { type: UPDATE_START_POSITION, payload: cords };
  },
  updateEnd: (cords: Nullable<Cords>) => {
    return { type: UPDATE_END_POSITION, payload: cords };
  },

}
const connector = connect(
  mapState,
  mapDispatch
)
const belongsToSolutionPath = (solutionPath: Array<Cords>, cords: Cords): boolean => {
  let result = false;
  solutionPath.forEach(solutionStep => {
    if (solutionStep.x === cords.x && solutionStep.y === cords.y) {
      result = true;
    }
  })
  return result;
}

const Square: React.FC<Props> = (props: Props) => {
  const startPosition = props.start;
  const endPosition = props.end;
  const positionListener = props.positionListener;
  const cords = props.cords;
  const belongsToSolution = belongsToSolutionPath(props.solutionPath, props.cords);
  const isEven = (cords.x + cords.y) % 2 === 0;
  const stylingClass = isEven ? 'square__even' : 'square__odd';
  const [renderKnight, toggleRenderKnight] = React.useState((isEqual(props.start, cords) || (isEqual(props.end, cords))) && props.positionListener !== null);

  const toggleStartPosition = () => {
    if (startPosition === null || isEqual(startPosition, cords)) {
      if (renderKnight) {
        props.updateStart(null);
      } else {
        props.updateStart(cords);
      }
      toggleRenderKnight(!renderKnight)
    }
  }
  const renderKnightIcon = (): null | React.ReactNode => {
    if (renderKnight || belongsToSolution) {
      return (
        <img src={knight} key='start-knight' alt="knight chess icon" className={belongsToSolution ? "knight knight-transparent" : "knight"} />);
    }
    return null;
  }
  const toggleEndPosition = (): void => {
    if (endPosition === null || isEqual(endPosition, cords)) {
      if (renderKnight) {
        props.updateEnd(null);
      } else {
        props.updateEnd(cords);
      }
      toggleRenderKnight(!renderKnight)
    }
  }
  const setPosition = (): void => {
    if (positionListener === PositionType.Start) {
      toggleStartPosition();
    }
    if (positionListener === PositionType.End) {
      toggleEndPosition();
    }
  }


  return (<div className={`square ${stylingClass}`} onClick={setPosition} >
    {renderKnightIcon()}
  </div>)
}
export default connector(Square);

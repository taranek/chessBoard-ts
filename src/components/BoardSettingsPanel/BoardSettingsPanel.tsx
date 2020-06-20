import React from 'react';
import ChessBoardModel from 'domain/ChessBoardModel'
import { connect, ConnectedProps } from 'react-redux'
import { UPDATE_BOARD, PositionType, UPDATE_SOLUTION_PATH } from 'store/system/types';
import { Nullable } from 'generics/Nullable'
import Cords from 'domain/Cords';
import PositionSettings from 'components/PositionSettings/PositionSettings'
import Solution from 'domain/Solution'
import Knight from 'domain/Knight';
import KnightSettings from 'components/KnightSettings/KnightSettings';
import { Form, Field } from 'react-final-form';
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  boardModel: ChessBoardModel,
}
interface RootState {
  boardModel: ChessBoardModel,
  start: Nullable<Cords>,
  end: Nullable<Cords>
  knight: Knight,
}

const mapDispatch = {
  updateBoard: (size: number) => {
    let board = new ChessBoardModel(size);
    return { type: UPDATE_BOARD, payload: board };
  },
  updateSolutionPath: (solutionPath: Array<Cords>) => {
    return { type: UPDATE_SOLUTION_PATH, payload: solutionPath };
  }
}
const connector = connect(
  mapState,
  mapDispatch
)
function ProvideSolution(chessBoardSize: number, start: Nullable<Cords>, end: Nullable<Cords>, knight: Knight) {
  let startPosition: Cords = new Cords(0, 0);
  let endPosition: Cords = new Cords(0, 0);

  if (start !== null) {
    startPosition = new Cords(start.x, start.y);

  }
  if (end !== null) {
    endPosition = new Cords(end.x, end.y);
  }

  return Solution(chessBoardSize, startPosition, endPosition, knight);

}
function onSubmit(e: Event) {
  e.preventDefault();
  console.log('Submitted');
}
function validate(values: any) {
  console.log('Validated');
  console.log(values);
  return undefined;
}
const BoardSettingsPanel: React.FC<Props> = (props: Props) => {
  let knight: Knight = props.knight;
  let boardModel: ChessBoardModel = props.boardModel;
  let start: Nullable<Cords> = props.start;
  let end: Nullable<Cords> = props.end;
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let solutionPath = await ProvideSolution(boardModel.size, start, end, knight);
    let result: Cords[] = [];
    solutionPath.forEach(x => {
      result.push(x.cords);
    })
    props.updateSolutionPath(result);
  }
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form>
          <div style={{ boxSizing: 'border-box' }}>
            <div className="settings-container">
              <Field name='size'>
                {() => (
                  <div>
                    <span>
                      ChessBoard size:
                    </span>
                    <input
                      type='number'
                      min='2'
                      defaultValue={props.boardModel.size}
                      onChange={(e) => { props.updateBoard(Number(e.target.value)) }}
                    ></input>
                  </div>
                )}
              </Field>
            </div>
            <Field name='start'>
              {() => (
                <PositionSettings enableSetter={true} name={PositionType.Start} position={props.start}></PositionSettings>
              )}
            </Field>
            <Field name='end'>
              {() => (
                <PositionSettings enableSetter={true} name={PositionType.End} position={props.end}></PositionSettings>
              )}
            </Field>
            <KnightSettings></KnightSettings>
            <button className="btn-primary" disabled={props.start === null || props.end === null} onClick={(e: React.MouseEvent<HTMLButtonElement>): void => { (handleClick(e)) }}>Solve it!</button>
          </div>
        </form>

      )}>
    </Form>

  );
}

function mapState(state: RootState) {
  return {
    boardModel: state.boardModel,
    start: state.start,
    end: state.end,
    knight: state.knight,
  };
}

export default connector(BoardSettingsPanel);

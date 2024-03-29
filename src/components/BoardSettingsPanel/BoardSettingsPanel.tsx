import React from "react";
import { PositionType } from "store/system/types";
import { Nullable } from "generics/Nullable";
import { default as Cords } from "domain/Cords";
import PositionSettings from "components/PositionSettings/PositionSettings";
import Solution from "domain/Solution";
import Knight from "domain/Knight";
import KnightSettings from "components/KnightSettings/KnightSettings";
import { Form, Field } from "react-final-form";
import { connector, Props } from "./BoardsSettingsPanel.types";
import TreeNode from "../../domain/TreeNode";
const piWorker = new Worker(new URL("../../worker.js", import.meta.url));

export const ProvideSolution = (
  chessBoardSize: number,
  start: Nullable<Cords>,
  end: Nullable<Cords>,
  knight: Knight
) => {
  let startPosition: Cords = new Cords(0, 0);
  let endPosition: Cords = new Cords(0, 0);

  if (start !== null) {
    startPosition = new Cords(start.x, start.y);
  }

  if (end !== null) {
    endPosition = new Cords(end.x, end.y);
  }

  return Solution(chessBoardSize, startPosition, endPosition, knight);
};
const onSubmit = (e: Event) => {
  e.preventDefault();
  console.log("Submitted");
};
const validate = (values: any) => {
  console.log("Validated");
  console.log(values);
  return undefined;
};

const BoardSettingsPanel: React.FC<Props> = ({
  knight,
  boardModel,
  start,
  end,
  updateSolutionPath,
  updateBoard,
  ...rest
}: Props) => {
  React.useEffect(() => {
    piWorker.onmessage = (event) => {
      console.log("got a message from worker: ", event);
      updateSolutionPath(event.data.map((d: TreeNode) => d.cords));
    };
  }, [updateSolutionPath]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    piWorker.postMessage({
      size: boardModel.size,
      start,
      end,
      knight,
    });
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form>
          <div style={{ boxSizing: "border-box" }}>
            <div className="settings-container">
              <Field name="size">
                {() => (
                  <>
                    <span>ChessBoard size:</span>
                    <input
                      type="number"
                      min="2"
                      defaultValue={boardModel.size}
                      onChange={(e) => {
                        updateBoard(Number(e.target.value));
                      }}
                    ></input>
                  </>
                )}
              </Field>
            </div>
            <Field name="start">
              {() => (
                <PositionSettings
                  enableSetter={true}
                  name={PositionType.Start}
                  position={start}
                ></PositionSettings>
              )}
            </Field>
            <Field name="end">
              {() => (
                <PositionSettings
                  enableSetter={true}
                  name={PositionType.End}
                  position={end}
                ></PositionSettings>
              )}
            </Field>
            <KnightSettings />
            <button
              className="btn-primary"
              disabled={start === null || end === null}
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                handleClick(e);
              }}
            >
              Solve it!
            </button>
          </div>
        </form>
      )}
    ></Form>
  );
};

export default connector(BoardSettingsPanel);

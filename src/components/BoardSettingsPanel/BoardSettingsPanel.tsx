import * as React from 'react';
import { PositionType } from 'store/system/types';
import { Nullable } from 'generics/Nullable'
import PositionSettings from 'components/PositionSettings/PositionSettings'
import Knight from 'domain/Knight';
import TreeNode from 'domain/TreeNode';
import ChessBoardModel from 'domain/ChessBoardModel';
import Graph from 'domain/Graph';
import KnightSettings from 'components/KnightSettings/KnightSettings';
import { Form, Field } from 'react-final-form';
import { connector, Props } from './BoardsSettingsPanel.types';
import { useWorker } from "@koale/useworker";

type Cords = {
  x: number;
  y: number;
}
const getSolution = (chessBoardSize: number, start: Cords, end: Cords, knight: Knight): TreeNode[] => {

  let chessBoardModel = new ChessBoardModel(chessBoardSize);
  chessBoardModel.graph.setStart(start);
  chessBoardModel.graph.setEnd(end);
  return BFS(chessBoardModel, knight);
}

const makeAllMoves = (knight: Knight, fromNode: TreeNode, chessBoard: ChessBoardModel): void => {
  makeMove({ x: knight.xMove, y: knight.yMove }, fromNode, chessBoard);
  makeMove({ x: -knight.xMove, y: knight.yMove }, fromNode, chessBoard);
  makeMove({ x: knight.xMove, y: -knight.yMove }, fromNode, chessBoard);
  makeMove({ x: -knight.xMove, y: -knight.yMove }, fromNode, chessBoard);

  makeMove({ x: knight.yMove, y: knight.xMove }, fromNode, chessBoard);
  makeMove({ x: -knight.yMove, y: knight.xMove }, fromNode, chessBoard);
  makeMove({ x: knight.yMove, y: -knight.xMove }, fromNode, chessBoard);
  makeMove({ x: -knight.yMove, y: -knight.xMove }, fromNode, chessBoard);

}

const makeMove = (moveCords: Cords, fromNode: TreeNode, chessBoard: ChessBoardModel): void => {

  let chessSize = chessBoard.size;
  let graph = chessBoard.graph;
  let cords = fromNode.cords;
  let destinationX = cords.x + moveCords.x;
  let destinationY = cords.y + moveCords.y;

  let fitHorizontally = destinationX <= chessSize - 1 && destinationX >= 0;
  let fitVertically = destinationY <= chessSize - 1 && destinationY >= 0;

  if (fitHorizontally && fitVertically) {
    let newNode = graph.getNode({ x: destinationX, y: destinationY });
    if (!newNode.searched) {
      fromNode.addEdge(newNode);
    }
  }
}

const BFS = (chessBoard: ChessBoardModel, knight: Knight): TreeNode[] => {
  let queue = [];
  let end = chessBoard.graph.end;
  let start = chessBoard.graph.start;
  queue.push(start);
  start.searched = true;
  while (queue.length !== 0) {
    let node = queue.shift();
    node.searched = true;
    if (node.cords === end.cords) {
      console.log('found!', node);
      console.log('With path:', node.getPath());
      return node.getPath();
    }
    makeAllMoves(knight, node, chessBoard)
    // console.log('Searching node:', node);
    traverseEdges(node, chessBoard.graph, queue);
  }
  console.log('Couldnt find a proper path')
  return [];
}

const traverseEdges = (node: TreeNode, graph: Graph, queue: TreeNode[]): void => {
  for (let edge of node.edges) {
    let n = graph.getNode(edge.cords);
    if (!n.searched) {
      n.parent = node;
      queue.push(n);
    }
  }
}

const ProvideSolution = (chessBoardSize: number, start: Nullable<Cords>, end: Nullable<Cords>, knight: Knight) => {
  let startPosition: Cords = { x: 0, y: 0 };
  let endPosition: Cords = { x: 0, y: 0 };

  if (start !== null) {
    startPosition = { x: start.x, y: start.y };
  }

  if (end !== null) {
    endPosition = { x: end.x, y: end.y };
  }

  return getSolution(chessBoardSize, startPosition, endPosition, knight);

}
const onSubmit = (e: Event) => {
  e.preventDefault();
  console.log('Submitted');
}
const validate = (values: any) => {
  console.log('Validated');
  console.log(values);
  return undefined;
}

const BoardSettingsPanel: React.FC<Props> = ({ knight, boardModel, start, end, updateSolutionPath, updateBoard, ...rest }: Props) => {

  const [sortWorker] = useWorker(ProvideSolution);

  const runSort = async () => {
    const result = await sortWorker(boardModel.size, start, end, knight); // non-blocking UI
    console.log("End.");
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let solutionPath = await ProvideSolution(boardModel.size, start, end, knight);
    let result: Cords[] = [];
    solutionPath.forEach(x => {
      result.push(x.cords);
    })
    updateSolutionPath(result);
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
                      defaultValue={boardModel.size}
                      onChange={(e) => { updateBoard(Number(e.target.value)) }}
                    ></input>
                  </div>
                )}
              </Field>
            </div>
            <Field name='start'>
              {() => (
                <PositionSettings enableSetter={true} name={PositionType.Start} position={start}></PositionSettings>
              )}
            </Field>
            <Field name='end'>
              {() => (
                <PositionSettings enableSetter={true} name={PositionType.End} position={end}></PositionSettings>
              )}
            </Field>
            <KnightSettings></KnightSettings>
            <div onClick={async () => { await runSort() }}>Click</div>
            <button className="btn-primary" disabled={start === null || end === null} onClick={(e: React.MouseEvent<HTMLButtonElement>): void => { (handleClick(e)) }}>Solve it!</button>
          </div>
        </form>

      )}>
    </Form>

  );
}



export default connector(BoardSettingsPanel);

import Graph from "./Graph";
import Cords from "./Cords";
import TreeNode from "./TreeNode";
import ChessBoardModel from "./ChessBoardModel";
import Knight from "./Knight";


export default async function setup(chessBoardSize: number, start: Cords, end: Cords, knight: Knight): Promise<TreeNode[]> {

  let chessBoardModel = new ChessBoardModel(chessBoardSize);
  chessBoardModel.graph.setStart(start);
  chessBoardModel.graph.setEnd(end);
  return await BFS(chessBoardModel, knight);
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
    let newNode = graph.getNode(new Cords(destinationX, destinationY));
    if (!newNode.searched) {
      fromNode.addEdge(newNode);
    }
  }
}

const BFS = async (chessBoard: ChessBoardModel, knight: Knight): Promise<TreeNode[]> => {
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
import Graph from "./Graph";
import Cords from "./Cords";
import TreeNode from "./TreeNode";
import ChessBoardModel from "./ChessBoardModel";
import Knight from "./Knight";


export default function setup() {
  let chessSize = 4;  
  let xMove = 1;
  let yMove = 1;
  let knight = new Knight(xMove,yMove);
  let chessBoard = new ChessBoardModel(chessSize);
  let graph = chessBoard.graph;  
  graph.setStart( new Cords(0,0));
  graph.setEnd(new Cords(chessSize-1,chessSize-1));
  
  BFS(chessBoard, knight);
  console.log(graph);
}

function makeAllMoves(knight:Knight, fromNode:TreeNode, chessBoard:ChessBoardModel):void {
  makeMove({ x: knight.xMove, y: knight.yMove }, fromNode, chessBoard);
  makeMove({ x: -knight.xMove, y: knight.yMove }, fromNode, chessBoard);
  makeMove({ x: knight.xMove, y: -knight.yMove }, fromNode, chessBoard);
  makeMove({ x: -knight.xMove, y: -knight.yMove }, fromNode, chessBoard);
}

function makeMove(moveCords:Cords, fromNode:TreeNode, chessBoard:ChessBoardModel) {

  let chessSize = chessBoard.size;
  let graph = chessBoard.graph;
  let cords = fromNode.cords;
  let destinationX = cords.x + moveCords.x;
  let destinationY = cords.y + moveCords.y;
  
  let fitHorizontally = destinationX <= chessSize - 1 && destinationX >= 0;
  let fitVertically =  destinationY <= chessSize - 1 && destinationY >= 0;
  
  if(fitHorizontally && fitVertically){
    let newNode = graph.getNode(new Cords(destinationX,destinationY));
    if (!newNode.searched) {
      fromNode.addEdge(newNode);
    }
  }
}

function BFS(chessBoard:ChessBoardModel, knight:Knight) {
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
      return;
    }
    makeAllMoves(knight, node,chessBoard)
    console.log('Searching node:', node);
    traverseEdges(node,chessBoard.graph,queue);
  }
}

function traverseEdges(node:TreeNode,graph:Graph, queue:Array<TreeNode>){
  for (let edge of node.edges) {
    let n = graph.getNode(edge.cords);
    if (!n.searched) {
      n.parent = node;
      queue.push(n);
    }
  }
}
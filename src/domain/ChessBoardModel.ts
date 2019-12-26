import Graph from "./Graph";
import Cords from "./Cords";
import TreeNode from "./TreeNode";

export default class ChessBoardModel{
  size:number;
  graph:Graph;

  constructor(chessSize:number){
    this.size = chessSize;
    this.graph = this.populateInitialGraph(chessSize);
  };

  private populateInitialGraph(chessSize:number):Graph{
    let graph = new Graph();
    for (let i = 0; i < chessSize; i++) {
      for (let j = 0; j < chessSize; j++) {
        let cords = new Cords(i,j);
        let node = new TreeNode(cords);
        graph.addNode(node);
      }
    }
    return graph;
  }
}

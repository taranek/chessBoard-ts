import TreeNode from "./TreeNode";
import Cords from "./Cords";

export default class Graph {
  nodes: Array<TreeNode> = [];
  graph: any = {};
  end: any;
  start: any;

  constructor(){
    this.end = null;
    this.start = null;
  }
  addNode(n:TreeNode) {
    this.nodes.push(n);
    let key = String([n.cords.x, n.cords.y]);
    this.graph[key] = n;
  }
  getNode(cords:Cords) {
    let key = String([cords.x, cords.y]);
    var n = this.graph[key];
    return n;
  }
  setStart(cords:Cords) {
    let key = String([cords.x, cords.y]);
    this.start = this.graph[key];
    return this.start;
  }
  setEnd(cords:Cords) {
    let key = String([cords.x, cords.y]);
    this.end = this.graph[key];
    return this.end;
  }
}

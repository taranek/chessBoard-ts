import Cords from "./Cords";

export default class TreeNode{
  edges: Array<TreeNode> = [];
  searched: boolean = false;
  parent: any = null;
  cords: Cords;

  constructor(cords:Cords) {
    this.cords = cords;
  }

  addEdge(neighbour:TreeNode):void {
    if (this.edges.filter(x => x.cords === neighbour.cords).length === 0) {
      this.edges.push(neighbour);
      neighbour.edges.push(this);
    }
  }
  getPath() {
    let path = [];
    path.push(this);
    let parent = this.parent;
    while (parent != null) {
      path.push(parent);
      parent = parent.parent;
    }
    return path;
  }
}

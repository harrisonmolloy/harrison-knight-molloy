export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface Node {
  id: string;
  name: string;
  type: string;
}

export interface Link {
  source: string;
  target: string;
}

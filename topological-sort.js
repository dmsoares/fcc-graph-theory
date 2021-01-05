const adjList = {
  A: ["D"],
  B: ["D"],
  C: ["A", "B"],
  D: ["H", "G"],
  E: ["A", "D", "F"],
  F: ["K", "J"],
  G: ["I"],
  H: ["J", "I"],
  I: ["L"],
  J: ["M", "L"],
  K: ["J"],
  L: [],
  M: [],
};

const orderedNodes = [];
const visited = {};

const topSort = (node, list = adjList) => {
  if (node in visited) return;
  visited[node] = true;

  for (const child of list[node]) {
    topSort(child);
  }

  orderedNodes.unshift(node);
};

while (orderedNodes.length !== Object.keys(adjList).length) {
  for (const key in adjList) {
    if (!(key in visited)) topSort(key);
  }
}
console.log(orderedNodes);

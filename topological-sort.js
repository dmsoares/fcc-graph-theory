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

const topSort = (adjList) => {
  const orderedNodes = [];
  const visited = {};

  const dfs = (node, list = adjList) => {
    if (node in visited) return;
    visited[node] = true;

    for (const child of list[node]) {
      dfs(child);
    }

    orderedNodes.unshift(node);
  };

  while (orderedNodes.length !== Object.keys(adjList).length) {
    for (const key in adjList) {
      if (!(key in visited)) dfs(key);
    }
  }

  return orderedNodes;
};
console.log(topSort(adjList));

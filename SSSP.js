const adjList = {
  A: [
    ["B", 3],
    ["C", 6],
  ],
  B: [
    ["C", 4],
    ["D", 4],
    ["E", 11],
  ],
  C: [
    ["D", 8],
    ["G", 11],
  ],
  D: [
    ["E", -4],
    ["F", 5],
    ["G", 2],
  ],
  E: [["H", 9]],
  F: [["H", 1]],
  G: [["H", 2]],
  H: [],
};

const topSort = (adjList) => {
  const sortedList = [];
  const visited = {};

  const dfs = (node, list = adjList) => {
    if (node in visited) return;
    visited[node] = true;

    for (const child of list[node]) {
      dfs(child[0]);
    }

    sortedList.unshift(node);
  };

  for (const key in adjList) {
    dfs(key);
  }

  return sortedList;
};

const sssp = (adjList, source) => {
  let sortedList = topSort(adjList);
  sortedList = sortedList.slice(sortedList.indexOf(source)); //sub-array starting from defined source
  const mapOfPaths = {};

  for (const node_i of sortedList) {
    if (node_i === source) mapOfPaths[node_i] = { prev: "", cost: 0 };

    for (const node_j of adjList[node_i]) {
      const adjNode = node_j[0];
      const newCost = mapOfPaths[node_i].cost + node_j[1];

      if (!mapOfPaths[adjNode]) {
        mapOfPaths[adjNode] = {
          prev: node_i,
          cost: newCost,
        };
        continue;
      }
      if (newCost < mapOfPaths[adjNode].cost) {
        mapOfPaths[adjNode] = {
          prev: node_i,
          cost: newCost,
        };
      }
    }
  }

  return mapOfPaths;
};

console.log(sssp(adjList, "A"));

const dungeon = [
  ["S", ".", ".", "X", ".", "X", "."],
  [".", "X", ".", ".", ".", "X", "."],
  [".", "X", ".", "X", ".", "X", "."],
  [".", "X", ".", ".", ".", "X", "E"],
];

const findCharInGrid = (grid, char) => {
  //Finds first character in grid and returns and array in the form [row, col, char]
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === char) return { row: i, col: j, char };
    }
  }
};

const createAdjListFrom = (grid) => {
  //Returns adjacency list in the form {"i,j": ["i+1,j", "i,j-1", ...], ...}
  let adjList = {};
  const numOfRows = grid.length;
  const numOfCols = grid[0].length;

  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      const neighbours = [];

      if (grid[i][j] !== "X") {
        if (i - 1 >= 0) {
          if (grid[i - 1][j] !== "X") neighbours.push(`${i - 1},${j}`);
        }
        if (j + 1 < numOfCols) {
          if (grid[i][j + 1] !== "X") neighbours.push(`${i},${j + 1}`);
        }
        if (i + 1 < numOfRows) {
          if (grid[i + 1][j] !== "X") neighbours.push(`${i + 1},${j}`);
        }
        if (j - 1 >= 0) {
          if (grid[i][j - 1] !== "X") neighbours.push(`${i},${j - 1}`);
        }
        adjList[`${i},${j}`] = neighbours;
      }
    }
  }
  return adjList;
};

const breadthForSearch = (adjList, start) => {
  //Returns object representing, for each key/node, the neighbour that sits on the shortest path to start
  let queue = {
    nodes: [],
    enqueue(s) {
      return this.nodes.push(s);
    },
    dequeue() {
      return this.nodes.shift();
    },
  };
  queue.enqueue(`${start.row},${start.col}`);

  const visited = {};
  Object.keys(adjList).forEach((key) => (visited[key] = null));
  visited[`${start.row},${start.col}`] = start.char;

  while (queue.nodes.length > 0) {
    let node = queue.dequeue();

    for (const neighbour of adjList[node]) {
      if (visited[neighbour] === null) {
        queue.enqueue(neighbour);
        visited[neighbour] = node;
      }
    }
  }
  return visited;
};

const findShortestPath = (grid, start, end) => {
  const startNode = findCharInGrid(grid, start);
  const endNode = findCharInGrid(grid, end);
  const visited = breadthForSearch(createAdjListFrom(grid), startNode);

  let shortestPath = [];
  let current = `${endNode.row},${endNode.col}`;

  while (current !== startNode.char) {
    shortestPath.unshift(current);

    //if there are no possible paths between S and E,
    //visited will have key(s) with null values;
    //in that case return -1
    if (visited[current] === null) return -1;

    current = visited[current];
  }

  return shortestPath;
};

console.log(findShortestPath(dungeon, "S", "E"));

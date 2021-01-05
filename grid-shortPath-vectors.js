const dungeon = [
  ["S", ".", ".", "#", ".", "#", "."],
  [".", "#", ".", ".", ".", "#", "E"],
  [".", "#", ".", "#", ".", ".", "."],
  [".", "#", ".", ".", ".", "#", "."],
];

const findCharInGrid = (grid, char) => {
  //Finds first character in grid and returns and array in the form [row, col, char]
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === char) return { row: i, col: j, char };
    }
  }
};

const breadthForSearch = (grid, startChar) => {
  const { row: startRow, col: startCol } = findCharInGrid(grid, startChar);

  let queue = {
    nodes: [],
    enqueue(s) {
      return this.nodes.push(s);
    },
    dequeue() {
      return this.nodes.shift();
    },
  };
  queue.enqueue([startRow, startCol]);

  const visited = {};
  visited[`${startRow},${startCol}`] = startChar;

  const rowVector = [1, -1, 0, 0];
  const colVector = [0, 0, 1, -1];

  while (queue.nodes.length > 0) {
    let currPosition = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      let newRow = currPosition[0] + rowVector[i];
      let newCol = currPosition[1] + colVector[i];

      if (newRow < 0 || newRow >= grid.length) continue;
      if (newCol < 0 || newCol >= grid[0].length) continue;
      if (grid[newRow][newCol] == "#") continue;

      if (!(`${newRow},${newCol}` in visited)) {
        queue.enqueue([newRow, newCol]);
        visited[
          `${newRow},${newCol}`
        ] = `${currPosition[0]},${currPosition[1]}`;
      }
    }
  }
  return visited;
};

const findShortestPath = (grid, start, end) => {
  const visited = breadthForSearch(grid, start);
  end = findCharInGrid(grid, end);

  const path = [];
  let currPosition = `${end.row},${end.col}`;

  while (currPosition !== start) {
    path.unshift(currPosition);

    if (!(currPosition in visited)) return -1;

    currPosition = visited[currPosition];
  }
  return path;
};
console.log(findShortestPath(dungeon, "S", "E"));

const dungeon = [
  ["S", ".", ".", "#", ".", ".", "."],
  [".", "#", ".", ".", ".", "#", "."],
  [".", "#", ".", "#", ".", "#", "."],
  [".", "#", ".", ".", "E", ".", "."],
];

const findCharInGrid = (grid, char) => {
  //Finds first character in grid and returns and array in the form [row, col, char]
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === char) return { row: i, col: j, char };
    }
  }
};

const createQueue = () => {
  let queue = {
    nodes: [],
    enqueue(s) {
      return this.nodes.push(s);
    },
    dequeue() {
      return this.nodes.shift();
    },
    size() {
      return this.nodes.length;
    },
  };
  return queue;
};

const shortestPath = (grid) => {
  const R = grid.length; //number of rows
  const C = grid[0].length; //number of rows
  const { row: startRow, col: startCol } = findCharInGrid(grid, "S");
  const rowQ = createQueue();
  const colQ = createQueue();

  // Variables used to track the number of steps taken
  let move_count = 0;
  let nodes_left_in_layer = 1;
  let nodes_in_next_layer = 0;

  // Variable used to track whether the 'E' character
  // ever gets reached during the BFS
  let reached_end = false;

  // RxC matrix of false values used to track whether
  // the node at position (i, j) has been visited.
  const visited = Array(R)
    .fill()
    .map(() => Array(C).fill(false));

  const explore_neighbours = (row, col) => {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      let newRow = row + dr[i];
      let newCol = col + dc[i];

      // Skip out of bounds locations
      if (newRow < 0 || newCol < 0) continue;
      if (newRow >= R || newCol >= C) continue;

      // Skip visited locations or blocked cells
      if (visited[newRow][newCol]) continue;
      if (grid[newRow][newCol] == "#") continue;

      rowQ.enqueue(newRow);
      colQ.enqueue(newCol);
      visited[newRow][newCol] = true;
      nodes_in_next_layer++;
    }
  };

  const solve = () => {
    rowQ.enqueue(startRow);
    colQ.enqueue(startCol);
    visited[startRow][startCol] = true;

    while (rowQ.size() > 0) {
      console.log(
        "nodes_in_next_layer:",
        nodes_in_next_layer,
        "nodes_left_in_layer:",
        nodes_left_in_layer,
        "move_count:",
        move_count
      );
      let row = rowQ.dequeue();
      let col = colQ.dequeue();
      if (grid[row][col] == "E") {
        reached_end = true;
        break;
      }
      explore_neighbours(row, col);
      nodes_left_in_layer--;
      if (nodes_left_in_layer == 0) {
        nodes_left_in_layer = nodes_in_next_layer;
        nodes_in_next_layer = 0;
        move_count++;
      }
    }
    if (reached_end) return move_count;
    return -1;
  };

  return solve();
};

console.log(shortestPath(dungeon));

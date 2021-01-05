const g = [
  [1, 5, 9],
  [0, 4],
  [7, 8, 9],
  [6],
  [1],
  [0, 7],
  [3, 8],
  [2, 5],
  [2, 6],
  [0, 2],
];
const n = g.length;

function bfs(s, e) {
  let prev;

  prev = solve(s);

  return reconstructedPath(s, e, prev);
}

function solve(s) {
  let q = {
    queue: [],
    enqueue(s) {
      return this.queue.push(s);
    },
    dequeue() {
      return this.queue.shift();
    },
  };
  q.enqueue(s);

  let visited = Array(n).fill(false);
  visited[s] = true;

  let prev = Array(n).fill(null);

  while (q.queue.length > 0) {
    let node = q.dequeue();
    console.log("node:", node, "g[node]:", g[node]);
    let neighbours = [...g[node]];

    for (const next of neighbours) {
      if (!visited[next]) {
        q.enqueue(next);
        visited[next] = true;
        prev[next] = node;
      }
    }
  }

  return prev;
}

function reconstructedPath(s, e, prev) {
  let path = [];
  for (let at = e; at != null; at = prev[at]) {
    path.push(at);
  }
  path.reverse;

  if (path[0] == s) return path;

  return [];
}

console.log(bfs(0, n - 1));

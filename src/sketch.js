// DEBUG
const DEBUG = true;

// Size of canvas
const SIZE_CANVAS = 500;

// Size cell
let currentCell;

const COUNT_CELL = 10;
const SIZE_CELL = SIZE_CANVAS / COUNT_CELL;

// Manage *A
let loadNeighbors = true;

let current;
let path = [];
let startCell;
let finishCell;

let openSet = []; // Nodes check
let closedSet = []; // Nodes not check

// Manage grid
let cols, rows;
const grid = [];
const stack = [];

function setup() {
  createCanvas(SIZE_CANVAS, SIZE_CANVAS);

  if(DEBUG) {
    frameRate(5);
  }

  cols = floor(width / SIZE_CELL);
  rows = floor(height / SIZE_CELL);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // Start cell visited
  currentCell = grid[0];
  // Manage *A
  startCell = currentCell;
  finishCell = random(grid);

  openSet.push(startCell);
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
  }
  currentCell.visited = true;
  if(DEBUG) {
    currentCell.highlight();
  }
  /* STEP 1 */
  const next = currentCell.checkNeighbors();
  if(next) {
    next.visited = true;
    /* STEP 2 */
    stack.push(currentCell);
    /* STEP3 */
    removeWalls(currentCell, next);
    /* STEP 4 */
    currentCell = next;
  } else if(stack.length > 0) {
    currentCell = stack.pop();
  } else {
    // Load all Neighbors with node
    if(loadNeighbors) {
      for (let i = 0; i < grid.length; i++) {
        grid[i].addNeighbors();
      }
    }
    
    // Manage A*
    if(openSet.length > 0) {
      /* Value is less */
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if(openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      current = openSet[lowestIndex];
      
      /* Finish search */
      if(openSet[lowestIndex] === finishCell) {
        noLoop();
      }

      removeFromArray(openSet, current)
      closedSet.push(current);
      
      current.neighbors.forEach(neighbor => {
        if(closedSet.includes(neighbor)) {
          return ;
        }
        const tempG = current.g + 1;
        if(openSet.includes(neighbor)) {
          if(tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }
        neighbor.h = heuristic(neighbor, finishCell);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      });
    } else {
      // No solution
      alert('No solution, please atention!!');
    }

    if(DEBUG) {
      for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].highlight(color(255, 0, 0)); // Red
      }
      for (let i = 0; i < openSet.length; i++) {
        openSet[i].highlight(color(0, 255, 0)); // Green
      }
    }

    for (let i = 0; i < path.length; i++) {
      path[i].highlight(color(0, 0, 255)); // blue
    }

    // Find the path *A
    path = [];
    let temp = current;
    path.push(temp)
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

    // Point start and end
    startCell.highlight(color('#ff0000'));
    finishCell.highlight(color(255, 204, 0));

    loadNeighbors = false;
  }
}

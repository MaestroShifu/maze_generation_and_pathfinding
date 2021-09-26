// DEBUG
const DEBUG = false;

// Size of canvas
const SIZE_CANVAS = 500;

// Size cell
let currentCell;

const COUNT_CELL = 10;
const SIZE_CELL = SIZE_CANVAS / COUNT_CELL;

// Manage *A
let startCell;
let finishCell;

// Manage grid
let cols, rows;
const grid = [];
const stack = [];

function setup() {
  createCanvas(SIZE_CANVAS, SIZE_CANVAS);

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
    startCell.highlight();
    finishCell.highlight(true);
  }
}

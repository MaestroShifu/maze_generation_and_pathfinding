const TARGET_SIZE = 8;

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    this.visited = false;

    this.top = true;
    this.bottom = true;
    this.left = true;
    this.right = true;
  }

  highlight(isPoint = false) {
    const x = this.i * SIZE_CELL;
    const y = this.j * SIZE_CELL;

    const dx = x + TARGET_SIZE;
    const dy = y + TARGET_SIZE;
    const targetSize = SIZE_CELL - (TARGET_SIZE * 2); 

    noStroke();

    if(isPoint) {
      fill(255, 204, 0);
    } else {
      fill(0, 0, 255, 100);
    }

    rect(dx, dy, targetSize, targetSize);
  }

  checkNeighbors() {
    const neighbors = [];

    const top = grid[getIndex(this.i, (this.j - 1))];
    const right = grid[getIndex((this.i + 1), this.j)];
    const bottom = grid[getIndex(this.i, (this.j + 1))];
    const left = grid[getIndex((this.i - 1), this.j)];

    if(top && !top.visited) {
      neighbors.push(top);
    }
    if(bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if(left && !left.visited) {
      neighbors.push(left);
    }
    if(right && !right.visited) {
      neighbors.push(right);
    }
    if(neighbors.length > 0) {
      return random(neighbors);
    }
    
    return undefined;
  }

  /* Manage draw cells in the grid */
  draw() {
    const x = this.i * SIZE_CELL;
    const y = this.j * SIZE_CELL;
    const maxX = x + SIZE_CELL;
    const maxY = y + SIZE_CELL;

    stroke(255);

    /* Print lines */
    if(this.top) {
      line(x, y, maxX, y);
    }
    if(this.bottom) {
      line(x, maxY, maxX, maxY);
    }
    if(this.left) {
      line(x, y, x, maxY);
    }
    if(this.right) {
      line(maxX, y, maxX, maxY);
    }

    /* Manage visited node */
    if(this.visited && DEBUG) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, SIZE_CELL, SIZE_CELL);
    }
  }
}

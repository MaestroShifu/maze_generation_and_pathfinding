const removeWalls = (curr, next) => {
  const x = curr.i - next.i;
  const j = curr.j - next.j; 
  if(x === 1) {
    curr.left = false;
    next.right = false;
  }
  if(x === -1) {
    curr.right = false;
    next.left = false;
  }
  if(j === 1) {
    curr.top = false;
    next.bottom = false;
  }
  if(j === -1) {
    curr.bottom = false;
    next.top = false;
  }
}
  
const getIndex = (i, j) => {
  if(i < 0 || j < 0 || i > (cols - 1) || j > (rows - 1)) {
    return -1; // return undefined in array
  }
  return i + j * cols;
}

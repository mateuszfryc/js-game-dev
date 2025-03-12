const Maze = function({ singleCellSize, wallsThickness }) {
  this.width = Math.floor( canvas.width / singleCellSize );
  this.height = Math.floor( canvas.height / singleCellSize );
  this.cells = [[]];
  this.init( this, singleCellSize, wallsThickness );
}

Maze.prototype.areAllCellsVisited = function() {
  let areAllVisited = true;

  for( i = 0; i < this.width - 1; i++ ) {
    for( j = 0; j < this.height - 1; j++ ) {
      const { visited } = this.cells[i][j];
      if( !visited ) areAllVisited = false;
    }
  }

  return areAllVisited;
}

// check if cell is valid - not out of bounds
Maze.prototype.isCellValid = function( x, y ) {
  if( this.cells[ x ] && this.cells[ x ][ y ] ) return this.cells[ x ][ y ];
  return false;
}

Maze.prototype.init = function( self, singleCellSize, wallsThickness ) {
  // create two dimensional array of Cell objects
  for( i = 0; i < this.width; i++ ) {
    this.cells[ i ] = []
    for( j = 0; j < this.height; j++ ) {
      this.cells[ i ][ j ] = new Cell( i, j, singleCellSize, wallsThickness, this );
    }
  }

  let currentCell = this.cells[0][0];
  currentCell.visited = true;
  let stack = [currentCell];
  let nextCell = undefined;
  
  while( !(this.areAllCellsVisited()) ) {

  const { x, y } = stack[ stack.length - 1 ].address;

  currentCell = this.cells[ x ][ y ];
  currentCell.visited = true;
  nextCell = currentCell.getNeighbour( this );
    if( nextCell ) {
      // clear walls between both cells and randomly open one of walls
      const shouldOpenRandomWall = flipCoin();
      currentCell.clearWallsWith( nextCell, true /* shouldOpenRandomWall */ );

      // add cell to the stack
      stack.push(nextCell);
    }
    // if there is no visited cells avilable, trace the stack back to the first cell that has neighbour that was not visited avilable and start from there
    else {
      while( !nextCell && stack.length > 0 ) {
        // remove last element
        stack.splice(-1,1);

        if( stack.length > 0 ) {
          const { x, y } = stack[ stack.length - 1 ].address;
          currentCell = this.cells[ x ][ y ];
          nextCell = currentCell.getNeighbour( this );
        }
      }
      if( nextCell ) {
        stack.push(nextCell);
        // clear walls between both cells and randomly open one of walls
        // const shouldOpenRandomWall = RNG( 1 );
        currentCell.clearWallsWith( nextCell );
        currentCell.visited = true;
      }
    }
  }
};

Maze.prototype.drawWalls = function( color ) {
  for( i = 0; i < this.cells.length; i++ ) {
    for( j = 0; j < this.cells[0].length; j++ ) {
      this.cells[ i ][ j ].draw( color );
    }
  }
};

Maze.prototype.drawFilling = function() {
  ctx.drawImage(
    wallsFilling,
    0, 0,
    canvas.width,
    canvas.height,
  );
};

Maze.prototype.draw = function() {
  this.drawWalls();
  // canvas.sourceATop();
  // this.drawFilling();
  // canvas.multiply();
  // this.drawWalls( '#f1f1f1' );
  // canvas.sourceOver();
};

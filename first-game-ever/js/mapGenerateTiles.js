generateMap.prototype.createLayer = function () {
  var that = this;
  that.tiles = [];
  for (r = 0; r < that.yTilesNumber; r++) {
    that.tiles[r] = [r];
    for (c = 0; c < that.xTilesNumber; c++) {
      that.tiles[r][c] = {
        r: r,
        c: c,
        // Absolute values describe coordinates for each tile in realtion to map top left corner.
        xAbsolute: that.calculateTile_x(r, c),
        yAbsolute: that.calculateTile_y(r, c),
        // Next values are coordinates used when moving map relative to canvas.
        x: that.calculateTile_x(r, c),
        y: that.calculateTile_y(r, c),
        z: 0,
        //address: row and column
        canWalkOnIt: true,
        playerStandsOnIt: false,
        // randomly chooses one of four tile types and if Island map type is enabled - makes edge of map water
        type: that.imgType(),
      };
      // l("r: " + r + " c: " + c);
    }
  }
};

generateMap.prototype.calculateTile_x = function (r, c) {
  var that = this;
  if (r === 0 || r % 2 === 0) {
    var tileX = c * that.tileWidth;
    return tileX;
  } else {
    var tileX = c * that.tileWidth + that.tileWidthHalf;
    return tileX;
  }
};
generateMap.prototype.calculateTile_y = function (r, c) {
  var that = this;
  if (r === 0 || r % 2 === 0) {
    var tileY = r * that.tileHeightHalf;
    return tileY;
  } else {
    var tileY = r * that.tileHeightHalf;
    return tileY;
  }
};
generateMap.prototype.imgType = function () {
  var that = this;
  var sprite = Math.floor(Math.random() * 3 + 1);

  switch (sprite) {
    case 1:
      return grass;
      break;
    case 2:
      return grasslight;
      break;
    case 3:
      return grassdark;
      break;
    // case 4: return cobblestone;
  }
};

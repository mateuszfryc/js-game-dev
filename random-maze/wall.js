// brick filling for walls
let wallsFilling = new Image();
wallsFilling.src = 'https://cdn.shopify.com/s/files/1/1003/7610/products/Red_brick_wall_texture_Wall_Mural_Wallpaper_a.jpg?v=1578614224';

const Wall = function( a, b, thickness, positionInCell, isMazeBoundary ) {
  this.a = a || new Point();
  this.b = b || new Point();
  this.thickness = thickness || 2;
  this.shouldDraw = true;
  /*
    int indicating wall's position in cell:
    0: top
    1: right
    2: bottom
    3: left
  */
  this.positionInCell = positionInCell;
  this.isMazeBoundary = isMazeBoundary;
}

Wall.prototype.draw = function( color ) {
  const { a, b, thickness } = this;
  const th = thickness * 0.5;
  ctx.save();
  ctx.lineWidth = thickness;
  ctx.beginPath();
  // if line is horizontal
  if( a.y === b.y ) {
    ctx.moveTo( a.x - th, a.y );
    ctx.lineTo( b.x + th, b.y );
  }
  else {
    ctx.moveTo( a.x, a.y - th );
    ctx.lineTo( b.x, b.y + th );
  }
  ctx.strokeStyle = color || '#000000';
  ctx.stroke();
  ctx.restore();
}
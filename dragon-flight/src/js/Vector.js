"use strict";

Engine.Vector = function( x = 0, y = 0 )
{
  this.x = x;
  this.y = y;
};

Engine.Vector.prototype.setTo = function( x, y )
{
  this.x = x;
  this.y = y;
  return this;
};

Engine.Vector.prototype.move = function( x, y )
{
  this.x += x;
  this.y += y;
  return this;
};

Engine.Vector.prototype.add = function( v )
{
  this.x += v.x;
  this.y += v.y;
  return this;
};

Engine.Vector.prototype.rescale = function( oldScale, newScale )
{
  this.x /= oldScale;
  this.x *= newScale;
  this.y /= oldScale;
  this.y *= newScale;
};

Engine.Vector.prototype.multiply = function( a )
{
  this.x *= a;
  this.y *= a;
  return this;
};

Engine.Vector.prototype.getLength = function( x, y )
{
  return Math.sqrt( this.x * this.x + this.y * this.y );
};

Engine.Vector.prototype.normalize = function( x, y )
{
  const l = this.getLength();
  this.x /= l;
  this.y /= l;
  return this;
};

(function() {

  const { Vector } = Engine;

  Engine.Vector.prototype.copy = function( a )
  {
    return new Vector( this.x, this.y );
  };

})();

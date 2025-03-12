const Coin = new Sprite({
  path: "img/coin-sprite.png",
  columns: 10,
});

frameActions.push(function() {
  Coin.render();
})

window.onload = function() {
  animate();
};
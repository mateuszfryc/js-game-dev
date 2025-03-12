// flip a coin to draw true or false
function flipCoin() {
  return !!Math.round( Math.random() );
}

// test success for given 1/100 chance
function d100( chance ) {
  // percentage chance ( n out of 100 )
  let random = Math.round( Math.random() * 100 );
  return random < chance;
}

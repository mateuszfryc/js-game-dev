// setup requestAnimationFrame and its fallback in case it would not be present
(function() {
  let lastTime = 0;
  let vendors = ['ms', 'moz', 'webkit', 'o'];
  for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                  || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          let currTime = new Date().getTime();
          let timeToCall = Math.max(0, 16 - (currTime - lastTime));
          let id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());

// list of actions being executed every frame
const frameActions = []

// add function that will loop it self
function animate() {
  // clear canvas at the begining of every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // run code that will update animation every frame
  frameActions.forEach(action => action());

  requestAnimationFrame(animate);
};

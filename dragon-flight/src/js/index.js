'use strict';

(function () {
  const Scripts = [
    'lib/pixiJS_v5.1.3',
    'Engine',
    'Settings',
    'Assets',
    'Layers',
    'DebugDraw',
    'Vector',
    'Animation',
    'DummyData',
    'Keys',
    'Mouse',
    'Utils',
    'World',
    // 'Run_old',
    'Run',
  ];

  let src;
  let script;
  let pendingScripts = [];
  let firstScript = document.scripts[0];
  let ref = document.getElementsByTagName('body')[0];

  // Watch scripts load in IE
  function stateChange() {
    // Execute as many scripts in order as we can
    let pendingScript;
    while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
      pendingScript = pendingScripts.shift();
      // avoid future loading events from this script (eg, if src changes)
      pendingScript.onreadystatechange = null;
      // can't just appendChild, old IE bug if element isn't closed
      firstScript.parentNode.insertBefore(pendingScript, firstScript);
    }
  }

  // loop through our script urls
  for (let i = 0; i < Scripts.length; i++) {
    src = 'js/' + Scripts[i] + '.js';

    // modern browsers
    if ('async' in firstScript) {
      script = window.document.createElement('script');
      script.async = false;
      script.src = src;
      ref.appendChild(script);
    }

    // IE < 10
    else if (firstScript.readyState) {
      // create a script and add it to our todo pile
      script = document.createElement('script');
      pendingScripts.push(script);
      // listen for state changes
      script.onreadystatechange = stateChange;
      // must set src AFTER adding onreadystatechange listener
      // else we’ll miss the loaded event for cached scripts
      script.src = src;
    }

    // fall back to defer
    else {
      document.write('<script src="' + src + '" defer></' + 'script>');
    }
  }
})();

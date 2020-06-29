const drums = require('./drummachine');
const code = require('./codeManager');

window.onload = function(){
  drums.initDrums();
  code.bootCodeMirror();
}

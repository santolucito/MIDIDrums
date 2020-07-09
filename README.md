# Shiny Happy MIDI Drum Machine 

This is a MIDI-fied version of the [Shiny Drum Machine](http://chromium.googlecode.com/svn/trunk/samples/audio/shiny-drum-machine.html) by Chris Rogers and Ken Moore.  It's intended to be controlled by a Livid Instruments CNTRLR.

# Build

browserify js/main.js -o js/compiled.js

# Examples

function genBeat(oldBeat, currentTimestep){
  
  let b1 = new Array(16).fill(0);
  oldBeat.rhythm1 = b1.map((v,i) => {return (v+i)%3})
  oldBeat.rhythm3 = b1.map((v,i) => {return (v+i+1)%3})
  oldBeat.rhythm6 = b1.map((v,i) => {return (i%4 == 0) ? 1 : 0})
  return oldBeat;
};
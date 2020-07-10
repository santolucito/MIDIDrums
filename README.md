# Live Coding Drum Machine 

This is an experiment in bringing together live coding and hardware interfaces.
Live coding is a powerful way to describe music, but often silo's you in the programming world.
MIDI sequencers are a great way to have a tangible interface for pattern construction, but limited by the fact that you can only change one aspect of the pattern at a time - by pushing one button (or sometimes two) at a time.
The goal of this project is to bring these interfaces together so a performer use both the digital interface and tangible interface in one system.

I am working on a live programming-by-demonstration system for use with a hardware sequencer. Playing a hardware sequencer is similar to live coding in that it constructively builds a piece from a blank loop. However the interface of a sequencer does not allow for algorithmic changes (eg shift all notes by one beat, or every other note up a half step).The goal of this project is to augment the direct physical sensation of the hardware interface with the flexibility of code (or, to augment the virtual with the physical).

The overall flow is that as I construct a loop on the sequencer manually, the system continuously synthesizes code that generates the current pattern. Then I can edit this code and push the change back to the hardware sequencer, which then changes its pattern to reflect the code. If I then change the pattern on the physical device, the code is again synthesized and automatically updated.

# Credits 

The drum machine part of this code is based on the [Shiny Happy MIDI Drum Machine](https://github.com/cwilso/MIDIDrums) by cwilso, which is a MIDI-fied version of the [Shiny Drum Machine](http://chromium.googlecode.com/svn/trunk/samples/audio/shiny-drum-machine.html) by Chris Rogers and Ken Moore. 

It was originally intended to be controlled by a Livid Instruments CNTRLR, but I am hoping to add support for the novation Circuit. Or you can just use the nice web interface.

# Build

Everything runs client-side in your browser.

browserify js/main.js -o js/compiled.js

# Examples


# notes

passing currentTime into the function is bad, because you can't edit the pattern manually. also, it is the same thing as using the index of the array. so it looks cool on the pattern, but ends up not actually being so great.

function genBeat(oldBeat, currentTimestep){
  
  let b1 = new Array(16).fill(0);
  oldBeat.rhythm1 = b1.map((v,i) => {return (v+i)%3})
  oldBeat.rhythm3 = b1.map((v,i) => {return (v+i+1)%3})
  oldBeat.rhythm6 = b1.map((v,i) => {return (i%4 == 0) ? 1 : 0})
  return oldBeat;
};

# How it works

## Synthesis

The hard part of the system is generating code that matches the pattern.
To do this, we first recognize that the user can only change one thing at a time in the pattern.
(Note, this would change if we could have a record functionality, like most drum machines).
The code repair required for a single change in the pattern can always be a direct array element manipulation. For example, given the code

    pattern = new Array(4).fill(0)
    return pattern

If the user changes the pattern to 

    1 0 0 0

we can update the code with:
    
    pattern = new Array(4).fill(0)
    pattern[0] = 1
    return pattern

While this is technically solution, it does not take advantage of the ability of code to make structural changes. For example, if the next change is the user turning off that note

    0 0 0 0

We should not generate the code

    pattern[0] = 1
    pattern[0] = 0

but rather just delete that line all together.

Similarly, if the next change to the pattern was:
   
    1 0 1 0

We should not generate the code 

    pattern[0] = 1
    pattern[2] = 1

but rather, 

    pattern = pattern.map((v,i) => (i+1)%2)

Not sure how we do this yet
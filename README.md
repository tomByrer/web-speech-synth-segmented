# Web Speech Synth - Segmented

## Usage

Simple [online demo](https://tombyrer.github.io/web-speech-synth-segmented/) of the web browser's <a href=https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API>Web Speech API</a>.  You can play the input text in several ways:
* *whole* text block without period  or comma breaks
* *line* by line
* pauses between *words*
* letter by letter

You can see the steps my script is taking in the Log section on bottom.


## Build

Since I'm using GitHub hosting, the output is in `/docs`.  There are no dependacies used to build or run; I have my own mini-script at `/src/build.js` which may be ran by `npm run build`.

The optional `npm run watch` is just a helper for me to re-run the build script while I save new files.  I installed	[v6.1.0 Qard/onchange](https://github.com/Qard/onchange/releases/tag/v6.1.0) globally to help.


## Credits

Using `async` functions to `await` a `Promise` idea is from [Norbert Szabó](https://szabonorbert.me)'s StackOverflow [answer](https://stackoverflow.com/a/58049676/1324588).  Stopping hack is also from [StackOverflow](https://stackoverflow.com/a/23600185/1324588).  


## Known bugs

If you toggle between `Play Words` and `Play Letters` fast enough, you can trick it to play both shuffled into each other.  What is supposed to happen is one series stops as another playback begins.

# Easing Animation Frames

[![test](https://github.com/taisuke-j/easing-animation-frames/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/taisuke-j/easing-animation-frames/actions/workflows/test.yaml)
[![npm version](https://badge.fury.io/js/easing-animation-frames.svg)](https://badge.fury.io/js/easing-animation-frames)
[![Bundle size](https://img.shields.io/bundlephobia/min/easing-animation-frames.svg)](https://bundlephobia.com/result?p=easing-animation-frames)

```
npm i easing-animation-frames
```

This is a tiny library for creating CPU-friendly easing animations with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API and [Robert Penner's easing equations](http://robertpenner.com/easing/). Suggestions and pull requests for optimization are welcome.

![Bar Animation](https://raw.githubusercontent.com/wiki/taisuke-j/easing-animation-frames/images/readme-bar.gif)

## How to use

Select an easing type (`cubicInOut` by default) and pass a callback function to run for every animation frame which manipulates target DOM elements.

#### Minimum settings

```
// Template function
const updateBarWidth = ({ progress }) => {
  // Update the DOM with the progress value
}

easingAnimationFrames({
  template: updateBarWidth // Callback function to run for every frame, which receives progress from 0 to 1
});
```

#### With optional settings

```
// Template function
const updateBarWidth = ({
  progress,
  stopFrames, // Stops the animation
  resumeFrames, // Resumes the animation
  restartFrames, // Restarts the animation
}) => {
  // Update the DOM with the progress value
}

easingAnimationFrames({
  easingType: "quadInOut", // Easing function name
  duration: 3000, // Animation duration in milliseconds
  template: updateBarWidth, // Callback function to run for every frame, which receives progress from 0 to 1
  complete: animationComplete, // Callback funciton to run on completion
});
```

Duration is set to be 4,000 milliseconds by default, which you can change. Once the animation starts, the callback function (template) receives the progress value (from 0 to 1) that you can use to render the animation. The example above uses `(progress * 75)`% for the width of the bar, based on the time passed.

The template function also provides `stop` and `resume` functions, if you want to stop the animation before it completes and resume it.

## Browser Support

It uses `requestAnimationFrame`, which should be supported for [most of the modern browsers](https://caniuse.com/#feat=requestanimationframe).

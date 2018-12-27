# Easing Animation Frames

[![Build Status](https://travis-ci.org/taisuke-j/easing-animation-frames.svg?branch=master)](https://travis-ci.org/taisuke-j/easing-animation-frames)

```
npm i easing-animation-frames
```

This is a tiny library for creating CPU-friendly easing animations with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API and [Robert Penner's easing equations](http://robertpenner.com/easing/). Suggestions and pull requests for optimization are welcome.

![Bar Animation](https://raw.githubusercontent.com/wiki/taisuke-j/easing-animation-frames/images/readme-bar.gif)

## How to use
Select an easing type (`cubicInOut` by default) and pass a callback function to run for every animation frame which manipulates target DOM elements.

#### Minimum settings
```
easingAnimationFrames({
  template: updateBarWidth // Callback function to run for every frame, which receives progress from 0 to 1
});
```

#### With optional settings
```
easingAnimationFrames({
  easingType: "quadInOut", // Easing function name
  duration: 3, // Animation duration in milliseconds
  template: updateBarWidth, // Callback function to run for every frame, which receives progress from 0 to 1
  complete: animationComplete, // Callback funciton to run on completion
});
```

Duration is set to be 4,000 milliseconds by default, which you can change. Once the animation starts, the callback function (template) receives the progress value (from 0 to 1) that you can use to render the animation. The example above uses `(progress * 75)`% for the width of the bar, based on the time passed.

`npm start` to see the example.

The template function also provides `stop` and `resume` functions, if you want to stop the animation before it completes and resume it.

[React Easing Animation](https://github.com/taisuke-j/react-easing-animation) is a React HOC implementation of this library.

## Browser Support
It uses `requestAnimationFrame`, which should be supported for [most of the modern browsers](https://caniuse.com/#feat=requestanimationframe).

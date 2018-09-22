# Easing Animaiton Frames

This is a tiny library for creating CPU-friendly easing animations with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API and [Robert Penner's easing equations](http://robertpenner.com/easing/). Suggestions and pull requests for optimization are welcome.

![Grid View](https://raw.githubusercontent.com/wiki/taisuke-j/easing-animation-frames/images/readme-bar.gif)

## How to use
Select an easing type, and pass a callback function to run for every animation frame which manipulates target DOM elements. Duration is set to be .4 seconds by default, which you can change. Once the animation starts, the callback function receives the progress value (from 0 to 1) that you can use to render the animation. The example above uses `(progress * 75)`% for the width of the bar, based on the time passed.

`npm start` to see the example.

The frame callback function also provides `stop` and `resume` functions, if you want to stop the animation before it completes and resume it.

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
  duration: 3, // Animation duration in seconds
  template: updateBarWidth, // Callback function to run for every frame, which receives progress from 0 to 1
  callback: animationComplete, // Callback funciton to run on complete
});
```

## Browser Support
It uses `requestAnimationFrame`, which should be supported for [most of the modern browsers](https://caniuse.com/#feat=requestanimationframe).

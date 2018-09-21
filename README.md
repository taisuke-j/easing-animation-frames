# Easing Animaiton Frames

This is a tiny library for creating CPU-friendly easing animations with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API and [Robert Penner's easing equations](http://robertpenner.com/easing/). Suggestions and pull requests for optimization are welcome.

## How to use
Select an easing type, and pass a callback function to run for every animation frame which manipulates target DOM elements.

#### Minimum settings
```
easingAnimationFrames({
  template: updateBarWidth // Callback function to run for every frame, which receives progresss from 0 to 1
});
```

#### With optional settings
```
easingAnimationFrames({
  easingType: "quadInOut", // Easing function name
  duration: 3, // Animation duration in seconds
  template: updateBarWidth, // Callback function to run for every frame, which receives progresss from 0 to 1
  callback: animationComplete, // Callback funciton to run on complete
});
```

## Browser Support
It uses `requestAnimationFrame`, which should be supported for [most of the modern browsers](https://caniuse.com/#feat=requestanimationframe).

## Browser Support
- This README is incomplete
- Unit tests
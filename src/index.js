import * as easing from 'eases';

const raf = window.requestAnimationFrame || (callback => setTimeout(callback, 1000 / 60));
const caf = window.cancelAnimationFrame || (id => clearTimeout(id));

/**
 * EASING ANIMATION FRAMES
 * easingType - Easing function name of `eases` module
 * duration - Transition duration in seconds
 * template (required) - Receives the current progress, stop function and resume function
 * callback - Called after the transition completes
 */

const defaultOptions = {
  duration: 0.4,
  easingType: 'cubicInOut',
};

const easingAnimationFrames = ({
  easingType = defaultOptions.easingType,
  duration = defaultOptions.duration,
  template,
  callback,
} = {}) => {
  if (!template) {
    return;
  }

  const easingFunc = easing[easingType];
  const durationInMs = duration * 1000;
  let requestId = null;
  let startTime = null;
  let passedTime = 0;
  let progress = 0;
  let framesCancelled = false;
  let framesResumed = false;
  let resumeFrames = null;

  const cancelFrames = () => {
    framesCancelled = true;
  };

  // Callback function for every requestAnimationFrame
  const frame = (timestamp) => {
    if (framesResumed) {
      startTime = timestamp - passedTime;
      framesResumed = false;
    } else {
      startTime = startTime || timestamp;
      passedTime = timestamp - startTime;
    }

    // Continue until the time is up unless the cancel function is called
    if (passedTime < durationInMs && !framesCancelled) {
      // Dispatch request for the next frame
      requestId = raf(frame);

      // Theses are passed to the template
      progress = easingFunc(passedTime / durationInMs);
      resumeFrames = () => {
        if (!framesCancelled) {
          return;
        }
        framesCancelled = false;
        framesResumed = true;
        requestId = raf(frame);
      };

      try {
        // Render the frame
        template(progress, cancelFrames, resumeFrames);
      } catch (e) {
        caf(requestId);
      }
      return;
    }

    // Transition complete
    if (passedTime >= durationInMs) {
      template(1, null, null);
      if (callback) {
        callback();
      }
    }
  };

  // Start the transtion
  requestId = raf(frame);
};

export default easingAnimationFrames;

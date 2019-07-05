import * as eases from 'eases-jsnext';

// Polyfills
const raf = (typeof window !== 'undefined' && window.requestAnimationFrame)
  ? window.requestAnimationFrame : (callback => setTimeout(callback, 1000 / 60));
const caf = (typeof window !== 'undefined' && window.cancelAnimationFrame)
  ? window.cancelAnimationFrame : (id => clearTimeout(id));

/**
 * EASING ANIMATION FRAMES
 * easingType - Easing function name of `eases` module
 * duration - Transition duration in milliseconds
 * template (required) - Receives the current progress, stop, resume and restart functions
 * complete - Called after the transition completes
 */

const defaultOptions = {
  duration: 4000,
  easingType: 'cubicInOut',
};

export default function ({
  easingType = defaultOptions.easingType,
  duration = defaultOptions.duration,
  template,
  complete = null,
} = {}) {
  if (!template) {
    return;
  }

  // Transition settings
  let easingFunc = eases[easingType];
  let framesDuration = duration;
  let templateFunc = template;
  let completeFunc = complete;

  // Managing progress
  let requestId = null;
  let startTime = null;
  let passedTime = 0;
  let progress = 0;
  let stopFrames = null;
  let resumeFrames = null;
  let restartFrames = null;

  // Stop, resume and restart
  let framesComplete = false;
  let framesCancelled = false;
  let framesResumed = false;
  let framesRestarted = false;

  // Callback function for every requestAnimationFrame
  const frame = (timestamp) => {
    // The latter fallback is for setTimeout and unit tests
    const currentTime = timestamp || new Date().getTime();
    if (framesResumed) {
      startTime = currentTime - passedTime;
      framesResumed = false;
    } else {
      startTime = startTime || currentTime;
      passedTime = currentTime - startTime;
    }

    // Continue until the time is up unless the cancel function is called
    if (passedTime < framesDuration && !framesCancelled) {
      // Dispatch a new request for the next frame
      requestId = raf(frame);

      // Progress value (from 0 to 1) based on the time passed
      progress = easingFunc(passedTime / framesDuration);

      try {
        // Render the frame
        templateFunc({
          progress,
          stopFrames,
          resumeFrames,
          restartFrames,
        });
      } catch (e) {
        caf(requestId);
      }
      return;
    }

    // After `restartFrames` is called, the next frame that has been requested will be cancelled,
    // and it will restart transition with new settings
    if (framesRestarted) {
      // Resets settings
      framesCancelled = false;
      framesRestarted = false;

      // Restart
      raf(frame);
      return;
    }

    // Transition complete
    if (passedTime >= framesDuration) {
      templateFunc({
        progress: 1,
        stopFrames: null,
        resumeFrames: null,
        restartFrames,
      });

      framesComplete = true;
      requestId = null;

      if (completeFunc) {
        completeFunc();
      }
    }
  };

  // Function to stop the transition
  stopFrames = () => {
    framesCancelled = true;
  };

  // Function to resume the transition if it's been stopped by `stopFrames`
  resumeFrames = () => {
    if (!framesCancelled) {
      return;
    }
    framesCancelled = false;
    framesResumed = true;
    requestId = raf(frame);
  };

  // Function to restart transition with new settings
  restartFrames = ({
    restartEasingType = defaultOptions.easingType,
    restartDuration = defaultOptions.duration,
    restartTemplate,
    restartComplete = null,
  } = {}) => {
    if (!restartTemplate) {
      return;
    }

    // Update settings
    easingFunc = eases[restartEasingType];
    framesDuration = restartDuration;
    templateFunc = restartTemplate;
    completeFunc = restartComplete;

    startTime = null;
    passedTime = 0;
    progress = 0;

    // If there is transition already running
    if (!framesComplete && !framesCancelled) {
      stopFrames();
      framesRestarted = true;
    }

    // If the transition has been stopped
    if (framesCancelled) {
      framesCancelled = false;
      requestId = raf(frame);
    }

    // If the previous transition is already complete
    if (framesComplete) {
      framesComplete = false;
      requestId = raf(frame);
    }
  };

  // Start the transtion
  requestId = raf(frame);
}

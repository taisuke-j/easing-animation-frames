import { useState, useEffect, useCallback, useRef } from "react";
import easingAnimationFrames,
{
  EasingAnimationFramesOptions,
  RestartFramesFunction,
  ResumeFramesFunction,
  StopFramesFunction,
  TemplateOptions,
  TemplateFunction,
} from "./easing-animation-frames";

interface ProgressBarProps {
  percentage: number;
}

const primaryColor = "#2ecc71";

const getStyles = (percentage: number) => ({
  container: {
    margin: "0 auto",
    maxWidth: "1366px",
  },
  bar: {
    position: "relative" as "relative",
    width: `${percentage}%`,
    height: "100px",
    backgroundColor: primaryColor,
  },
  digits: {
    position: "absolute" as "absolute",
    right: "0",
    top: "50%",
    color: primaryColor,
    fontSize: "30px",
    transform: "translate(80px, -50%)",
  },
  button: {
    marginRight: "10px",
  }
});

function ProgressBar({ percentage }: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0);
  const isMounted = useRef<boolean>(false);
  const stopFrames = useRef<StopFramesFunction>();
  const resumeFrames = useRef<ResumeFramesFunction>();
  const restartFrames = useRef<RestartFramesFunction>();
  const template =  useRef<TemplateFunction>();

  useEffect(() => {
    isMounted.current = true;

    template.current = ({
      progress: p,
      stopFrames: stop,
      resumeFrames: resume,
      restartFrames: restart,
    }: TemplateOptions) => {
      if (isMounted) {
        setProgress(p);
      } else if (stop) {
        stop();
      }
      stopFrames.current = stop;
      resumeFrames.current = resume;
      restartFrames.current = restart;
    }

    const animationOptions: EasingAnimationFramesOptions = {
      duration: 3000,
      easingType: "quadInOut",
      template: template.current
    };

    easingAnimationFrames(animationOptions);

    return () => {
      isMounted.current = false;
    }
  }, []);

  const rawPercentage = percentage * progress;
  const roundedPercentage = Math.round(rawPercentage);

  const onStopClick = useCallback(() => {
    if (stopFrames.current) {
      stopFrames.current();
    }
  }, []);

  const onResumeClick = useCallback(() => {
    if (resumeFrames.current) {
      resumeFrames.current();
    }
  }, []);

  const onRestartClick = useCallback(() => {
    if (restartFrames.current) {
      restartFrames.current({
        restartDuration: 3000,
        restartTemplate: template.current as TemplateFunction,
      });
    }
  }, []);

  const styles = getStyles(rawPercentage);

  return (
    <div style={styles.container}>
      <div style={styles.bar}>
        <div style={styles.digits}>{roundedPercentage}%</div>
      </div>
      <button style={styles.button} onClick={onStopClick}>Stop</button>
      <button style={styles.button} onClick={onResumeClick}>Resume</button>
      <button style={styles.button} onClick={onRestartClick}>Restart</button>
    </div>
  );
}

export default ProgressBar;

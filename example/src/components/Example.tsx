import * as React from "react";
import * as ReactDOM from "react-dom";
import easingAnimationFrames, { restart, resume, stop } from "../../../src";

interface IProps {
  percentage: number;
}
interface IState {
  readonly progress: number;
}

class Percentage extends React.Component<IProps, IState> {

  public readonly state: IState = {
    progress: 0,
  };

  public isMounted: boolean = false;

  // Stops the animation
  public stopProgress: stop = null;

  // Resumes the animation
  public resumeProgress: resume = null;

  // Restart the animation
  public restartProgress: restart = null;

  public componentDidMount() {
    this.isMounted = true;
    easingAnimationFrames({
      duration: 3000,
      easingType: "quadInOut",
      template: this.setProgress,
    });
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  public setProgress = (
    progress: number,
    stopProgress: stop,
    resumeProgress: resume,
    restartProgress: restart,
  ) => {
    // This is a react case but if you're manipulating DOM with vanilla JS,
    // you can write a function to set values (CSS properties, etc) instead
    if (this.isMounted) {
      this.setState({ progress });
    } else if (stopProgress) {
      stopProgress();
    }
    this.stopProgress = stopProgress;
    this.resumeProgress = resumeProgress;
    this.restartProgress = restartProgress;
  }

  public render() {
    const { progress } = this.state;
    const { percentage } = this.props;
    const rawPercentage = percentage * progress;
    const roundedPercentage = Math.round(rawPercentage);
    const restartOptions = {
      restartDuration: 3000,
      restartTemplate: this.setProgress,
    };

    const styles = {
      bar: {
        backgroundColor: "#2ecc71",
        height: "100px",
        position: "relative" as "relative",
        width: `${rawPercentage}%`,
      },
      container: {
        margin: "0 auto",
        maxWidth: "1366px",
      },
      digits: {
        color: "#2ecc71",
        fontSize: "30px",
        position: "absolute" as "absolute",
        right: "0",
        top: "50%",
        transform: "translate(80px, -50%)",
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.bar}>
          <div style={styles.digits}>{roundedPercentage}%</div>
        </div>
        <button onClick={() => { if (this.stopProgress) { this.stopProgress(); }}}>Stop</button>
        <button onClick={() => { if (this.resumeProgress) { this.resumeProgress(); }}}>Resume</button>
        <button onClick={() => { if (this.restartProgress) { this.restartProgress(restartOptions); }}}>Restart</button>
      </div>
    );
  }
}

const Props = {
  percentage: 75,
};

ReactDOM.render(
  <Percentage {...Props} />,
  document.getElementById("app")!,
);

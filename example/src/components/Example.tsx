import * as React from "react";
import * as ReactDOM from "react-dom";
import easingAnimationFrames,
{
  easingAnimationFramesOptions,
  restartFramesFunction,
  restartFramesOptions,
  resumeFramesFunction,
  stopFramesFunction,
  templateOptions,
} from "../../../src";

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
  public stopFrames: stopFramesFunction = null;

  // Resumes the animation
  public resumeFrames: resumeFramesFunction = null;

  // Restart the animation
  public restartFrames: restartFramesFunction = null;

  public componentDidMount() {
    this.isMounted = true;
    const animationOptions: easingAnimationFramesOptions = {
      duration: 3000,
      easingType: "quadInOut",
      template: this.setProgress,
    };
    easingAnimationFrames(animationOptions);
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  public setProgress = ({
    progress,
    stopFrames,
    resumeFrames,
    restartFrames,
  }: templateOptions = { progress: 0 }) => {
    if (this.isMounted) {
      this.setState({ progress });
    } else if (stopFrames) {
      stopFrames();
    }
    this.stopFrames = stopFrames;
    this.resumeFrames = resumeFrames;
    this.restartFrames = restartFrames;
  }

  public render() {
    const { progress } = this.state;
    const { percentage } = this.props;
    const rawPercentage = percentage * progress;
    const roundedPercentage = Math.round(rawPercentage);
    const restartOptions: restartFramesOptions = {
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
        <button onClick={() => { if (this.stopFrames) { this.stopFrames(); }}}>Stop</button>
        <button onClick={() => { if (this.resumeFrames) { this.resumeFrames(); }}}>Resume</button>
        <button onClick={() => { if (this.restartFrames) { this.restartFrames(restartOptions); }}}>Restart</button>
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

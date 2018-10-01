export type EasingType =
	'backInOut'
	| 'backIn'
	| 'backOut'
	| 'bounceInOut'
	| 'bounceIn'
	| 'bounceOut'
	| 'circInOut'
	| 'circIn'
	| 'circOut'
	| 'cubicInOut'
	| 'cubicIn'
	| 'cubicOut'
	| 'elasticInOut'
	| 'elasticIn'
	| 'elasticOut'
	| 'expoInOut'
	| 'expoIn'
	| 'expoOut'
	| 'linear'
	| 'quadInOut'
	| 'quadIn'
	| 'quadOut'
	| 'quartInOut'
	| 'quartIn'
	| 'quartOut'
	| 'quintInOut'
	| 'quintIn'
	| 'quintOut'
	| 'sineInOut'
	| 'sineIn'
	| 'sineOut'

export interface EasingAnimationFramesProps {
  easingType?: EasingType;
  duration?: number;
  template: (progress: number, stop: stop, resume: resume, restart: restart) => void;
  complete?: () => void;
}

export interface restartFramesProps {
  restartEasingType?: EasingType;
  restartDuration?: number;
  restartTemplate: (progress: number, stop: stop, resume: resume, restart: restart) => void;
  restartComplete?: () => void;
}

export type stop = {() :void} | null
export type resume = {() :void} | null
export type restart = {(settings: restartFramesProps) :void} | null

declare function easingAnimationFrames(props: EasingAnimationFramesProps): void;

export default easingAnimationFrames;
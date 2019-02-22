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

export interface easingAnimationFramesOptions {
  easingType?: EasingType;
  duration?: number;
  template: (options: templateOptions) => void;
  complete?: () => void;
}

export interface restartFramesOptions {
  restartEasingType?: EasingType;
  restartDuration?: number;
  restartTemplate: (options: templateOptions) => void;
  restartComplete?: () => void;
}

export interface templateOptions {
  progress: number,
  stopFrames?: stopFramesFunction,
  resumeFrames?: resumeFramesFunction,
  restartFrames?: restartFramesFunction
}

export type stopFramesFunction = {(): void} | null | undefined
export type resumeFramesFunction = {(): void} | null | undefined
export type restartFramesFunction = {(options: restartFramesOptions): void} | null | undefined

declare function easingAnimationFrames(props: easingAnimationFramesOptions): void;

export default easingAnimationFrames;
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

export interface EasingAnimationFramesOptions {
  easingType?: EasingType;
  duration?: number;
  template: TemplateFunction;
  complete?: {(): void};
}

export interface RestartFramesOptions {
  restartEasingType?: EasingType;
  restartDuration?: number;
  restartTemplate: TemplateFunction;
  restartComplete?: {(): void};
}

export interface TemplateOptions {
  progress: number,
  stopFrames?: StopFramesFunction,
  resumeFrames?: ResumeFramesFunction,
  restartFrames?: RestartFramesFunction
}
export type TemplateFunction = {(options: TemplateOptions): void};

export type StopFramesFunction = {(): void} | null | undefined
export type ResumeFramesFunction = {(): void} | null | undefined
export type RestartFramesFunction = {(options: RestartFramesOptions): void} | null | undefined

declare function easingAnimationFrames(props: EasingAnimationFramesOptions): void;

export default easingAnimationFrames;
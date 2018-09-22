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
  template: Function;
  callback?: Function;
}
export interface stop {() :void}
export interface resume {() :void}

declare function easingAnimationFrames(props: EasingAnimationFramesProps): void;

export default easingAnimationFrames;
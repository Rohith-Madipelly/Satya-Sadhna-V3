import { useEffect } from 'react'
import Animated, {
	Easing,
	StyleProps,
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'



export const MovingText = ({ text, animationThreshold, style,reverseAnimation=false,isCenter=true }) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animationThreshold

	const textWidth = text.length * 3

	useEffect(() => {
		if (!shouldAnimate) return

		translateX.value = withDelay(
			1000,
			withRepeat(
				withTiming(-textWidth, {
					duration: 10000,
					easing: Easing.linear,
				}),
				-1,
				reverseAnimation, //true for reverse animation
			),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [translateX, text, animationThreshold, shouldAnimate, textWidth])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	return (
		<Animated.Text
			numberOfLines={1}
			style={[
				style,
				animatedStyle,
				// shouldAnimate && {
				// 	width: 9999, // preventing the ellipsis from appearing
				// 	paddingLeft: 16, // avoid the initial character being barely visible
				// },
				shouldAnimate
					? {
						width: 9999, // prevent ellipsis during scroll
						paddingLeft: 16,
					}
					: {
						textAlign: isCenter?'center':"", // center short text
						alignSelf:  isCenter?'center':"", // center within parent
					},
			]}
		>
			{text}
		</Animated.Text>
	)
}
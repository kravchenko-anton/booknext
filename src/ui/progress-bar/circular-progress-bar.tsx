import type { FC } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import Svg, { G, Path } from 'react-native-svg'

export interface CircularProgressProperties {
	style?: StyleProp<ViewStyle>
	size: number
	width: number
	fill: number
	backgroundWidth?: number
	tintColor?: string
	tintTransparency?: boolean
	backgroundColor?: string
	rotation?: number
	lineCap?: 'butt' | 'round' | 'square'
	fillLineCap?: 'butt' | 'round' | 'square'
	arcSweepAngle?: number
	children?: ((fill: number) => JSX.Element) | React.ReactChild
	childrenContainerStyle?: StyleProp<ViewStyle> | ViewStyle
	padding?: number
	renderCap?: (payload: { center: { x: number; y: number } }) => React.ReactNode
	dashedTint?: { width: number; gap: number }
	dashedBackground?: { width: number; gap: number }
}

export const polarToCartesian = (
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
) => {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	}
}

export const circlePathFunction = (
	x: number,
	y: number,
	radius: number,
	startAngle: number,
	endAngle: number
) => {
	const start = polarToCartesian(x, y, radius, endAngle * 0.999_999_9)
	const end = polarToCartesian(x, y, radius, startAngle)
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
	const d = [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y
	]
	return d.join(' ')
}
export const clampFill = (fill: number) => Math.min(100, Math.max(0, fill))

export const CircularProgressBar: FC<CircularProgressProperties> = ({
	backgroundColor,
	backgroundWidth,
	children = () => null,
	tintColor,
	arcSweepAngle = 360,
	childrenContainerStyle = {},
	renderCap,
	dashedBackground = { width: 0, gap: 0 },
	dashedTint = { width: 0, gap: 0 },
	fillLineCap,
	lineCap,
	rotation,
	style,
	tintTransparency,
	width,
	fill = 0,
	padding = 0,
	size
}) => {
	const maxWidthCircle = backgroundWidth
		? Math.max(width, backgroundWidth)
		: width
	const sizeWithPadding = size / 2 + padding / 2
	const radius = size / 2 - maxWidthCircle / 2 - padding / 2

	const currentFillAngle = (arcSweepAngle * clampFill(fill)) / 100
	const circlePath = circlePathFunction(
		sizeWithPadding,
		sizeWithPadding,
		radius,
		0,
		currentFillAngle
	)
	const backgroundPath = circlePathFunction(
		sizeWithPadding,
		sizeWithPadding,
		radius,
		tintTransparency ? 0 : currentFillAngle,
		arcSweepAngle
	)

	const coordinate = polarToCartesian(
		sizeWithPadding,
		sizeWithPadding,
		radius,
		currentFillAngle
	)
	const cap = renderCap ? renderCap({ center: coordinate }) : null

	const offset = size - maxWidthCircle * 2

	const localChildrenContainerStyle = {
		position: 'absolute',
		left: maxWidthCircle + padding / 2,
		top: maxWidthCircle + padding / 2,
		width: offset,
		height: offset,
		borderRadius: offset / 2,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		...(childrenContainerStyle as ViewStyle)
	}

	const strokeDasharrayTint =
		dashedTint.gap > 0
			? Object.values(dashedTint).map(value => Number.parseInt(String(value)))
			: undefined

	const strokeDasharrayBackground =
		dashedBackground.gap > 0
			? Object.values(dashedBackground).map(value =>
					Number.parseInt(String(value))
				)
			: null

	return (
		<View style={style}>
			<Svg width={size + padding} height={size + padding}>
				<G
					rotation={rotation}
					originX={(size + padding) / 2}
					originY={(size + padding) / 2}>
					{backgroundColor ? (
						<Path
							d={backgroundPath}
							stroke={backgroundColor}
							strokeWidth={backgroundWidth || width}
							strokeLinecap={lineCap}
							strokeDasharray={strokeDasharrayBackground || undefined}
							fill='transparent'
						/>
					) : null}
					{fill > 0 && (
						<Path
							d={circlePath}
							stroke={tintColor}
							strokeWidth={width}
							strokeLinecap={fillLineCap}
							strokeDasharray={strokeDasharrayTint}
							fill='transparent'
						/>
					)}
					{cap}
				</G>
			</Svg>
			{children ? (
				<View style={localChildrenContainerStyle as ViewStyle}>
					{
						// @ts-expect-error
						children(fill)
					}
				</View>
			) : null}
		</View>
	)
}

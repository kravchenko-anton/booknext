import type { TitleSizeType } from '@/ui/title/types'
import type { ButtonProperties } from './types'

export const settings: {
	colors: Record<Required<ButtonProperties>['variant'], string>
	titleSize: Record<ButtonProperties['size'], TitleSizeType>
	padding: Record<ButtonProperties['size'], string>
	iconSize: Record<ButtonProperties['size'], number>
} = {
	colors: {
		foreground:
			'bg-foreground border-[1px] border-bordered text-white hover:bg-muted',
		muted:
			'bg-muted border-[1px] border-bordered text-white hover:bg-foreground',
		primary: 'bg-primary text-white border-[1px] border-transparent',
		danger:
			'bg-danger text-white border-[1px] border-transparent hover:bg-danger',
		background:
			'bg-background border-[1px] border-transparent text-white hover:bg-muted',
		success:
			'bg-success text-white border-[1px] border-transparent hover:bg-success',
		warning:
			'bg-warning text-white border-[1px] border-transparent hover:bg-warning'
	},
	iconSize: {
		sm: 18,
		md: 22,
		lg: 26
	},

	titleSize: {
		sm: 'sm',
		md: 'lg',
		lg: 'xl'
	},
	padding: {
		sm: 'py-0.5 px-2',
		md: 'py-1.5 px-4',
		lg: 'py-1.5 px-4'
	}
}

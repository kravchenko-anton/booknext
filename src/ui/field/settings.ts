import type { FieldProperties } from './types'

export const settings: {
	colors: Record<Required<FieldProperties<never>>['variant'], string>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-bordered',
		muted: 'bg-muted border-[1px] border-bordered',
		background: 'bg-background border-[1px] border-foreground'
	}
}

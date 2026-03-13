
export const errorCatch = (error: any): string => {
	if (typeof error === 'string') return error
	if (typeof error?.response?.data?.message === 'string')
		return error.response.data.message
	//check validation errors from class validator
	if (Array.isArray(error?.response?.data?.message))
		return error.response.data.message.map((m: string) => m).join(', ')
	if (typeof error.message === 'string') return error.message
	return "Something went wrong"
}

import { z } from 'zod';

export const Role: {
	user: 'user';
	admin: 'admin';
} = {
	user: 'user',
	admin: 'admin'
};
export const AuthSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const GoogleAuthSchema = z.object({
	socialId: z.string()
});

export const AuthUserSchema = z.object({
	email: z.string().email(),
	role: z.nativeEnum(Role)
});
export const AuthOutputSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
	type: z.string().optional(),
	user: AuthUserSchema
});

export const RefreshSchema = z.object({
	refreshToken: z.string()
});

export type AuthDtoType = z.infer<typeof AuthSchema>;

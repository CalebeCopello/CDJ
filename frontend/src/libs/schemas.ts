import { z } from 'zod';

const signUpFormSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: 'The Username must be at lest 3 characters long' })
			.max(20, { message: 'The Username must not be longer than 20 characters long' })
			.regex(/^[a-zA-Z0-9_-]+$/, { message: 'The Username can only contain letters, numbers, hyphens, and underscores' })
			.trim(),
		email: z.string().email({ message: 'The Email is required' }).trim().toLowerCase(),
		password: z.string().min(4, { message: 'The Password must be 4 or more characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
		confirmPassword: z.string().min(4, { message: 'The Password must be 4 or more characters long' }).max(20, { message: 'Password must be at most 20 characters long' }),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ message: 'Passwords do not match', path: ['confirmPassword'] }
	);

const signInFormSchema = z.object({
	email: z.string().email({ message: 'The Email is required' }).trim().toLowerCase(),
	password: z.string().min(4, { message: 'The Password is at least 4 character long' }).max(20, { message: 'The Password is at most 20 character long' }),
});
export { signUpFormSchema, signInFormSchema };

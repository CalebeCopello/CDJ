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

const postFormSchema = z.object({
	title: z.string().min(10, { message: 'The title must have at least 10 characters long' }).max(300, { message: 'The tile must not be longer than 300 characters long' }),
	slug: z
		.string()
		.min(10, { message: 'The slug must have at least 10 characters long' })
		.max(60, { message: 'The slug must not be longer than 60 characters long' })
		.refine((s) => !s.includes(' '), { message: 'No spaces are alowed on the slug' }),
	img: z
		.custom<FileList>((value) => value instanceof FileList && value.length === 1, {
			message: 'An image is required',
		})
		.refine(
			(fileList) => {
				const allowedExtensions = ['jpg', 'jpeg', 'gif', 'png'];
				const fileName = fileList[0]?.name || '';
				const fileExtension = fileName.split('.').pop()?.toLowerCase();
				return fileExtension && allowedExtensions.includes(fileExtension);
			},
			{
				message: 'Only .jpg, .jpeg, .gif, or .png files are allowed',
			}
		)
		.refine((fileList) => fileList[0].size <= 2 * 1024 * 1024, {
			message: 'The image must be smaller than 2MB',
		}),
	body: z.string({ message: 'A body content is required' }).min(200, { message: 'The body of a post must be at least 200 characters long' }).max(50000, { message: 'The body of a post must not be longer than 50,000 characters long' }),
	tags: z.string().array().nonempty({ message: 'You must chose at least 1 tag' }),
	published_at: z.date().nullable(),
});
export { signUpFormSchema, signInFormSchema, postFormSchema };

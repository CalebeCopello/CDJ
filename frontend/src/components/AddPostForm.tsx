import { useEffect, useState } from 'react';

import { Box, Container, TextField, Paper, Typography, Divider, Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { CloudUpload } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { postFormSchema } from '../libs/schemas';

import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import Cookies from 'js-cookie';

interface TagsType {
	created_at: Date;
	id: number;
	name: string;
	updated_at: Date;
}

const AddPostForm = () => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [bodyValue, setBodyValue] = useState<string | undefined>('');
	const [fetchedTags, setFetchedTags] = useState<TagsType[] | undefined>([]);
	const [postImage, setPostImage] = useState<string>('/imgs/posts/placeholder.png');
	const [errorFetchMessage, setErrorFetchMessage] = useState<string | null>();
	const [successFetchMessage, setSuccessFetchMessage] = useState<string | null>();
	const [errorImageUploadMessage, setErrorImageUploadMessage] = useState<string | null>();
	const [titleValue, setTitleValue] = useState<string>('');
	const [slugValue, setSlugValue] = useState<string>('');

	const mValue: number = 2;
	const currentDate = dayjs();
	const API_URL: string = import.meta.env.VITE_API_URL;
	const TOKEN = Cookies.get('CDJAuth');

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<z.infer<typeof postFormSchema>>({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			title: '',
			slug: '',
			img: '',
			tags: [],
			published_at: new Date(),
		},
	});

	const fetchTags = () => {
		axios
			.get(`${API_URL}/tags/get-all`)
			.then((res) => {
				setFetchedTags(() => res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleInsertTags = (tag: string) => {
		const currentTags = getValues('tags') || [];
		const updatedTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
		setValue('tags', updatedTags as [string, ...string[]], { shouldValidate: true });
	};

	const handlePostFormSubmit = (values: z.infer<typeof postFormSchema>) => {
		setErrorFetchMessage(() => null);
		setSuccessFetchMessage(() => null);
		console.log(values);
		axios
			.post(
				`${API_URL}/post/add`,
				{
					title: values.title,
					slug: values.slug,
					published_at: values.published_at,
					tags: values.tags,
					body: values.body,
					img: values.img,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: TOKEN,
					},
				}
			)
			.then((res) => {
				console.debug('Post Form Submit Success Object:', res);
				setSuccessFetchMessage(() => 'Post Added');
			})
			.catch((err) => {
				if (err.response) {
					console.error(`Post From Submit Error Data:`, err.response.data.errors);
					console.error(`Post From Submit Error Status:`, err.response.status);
					console.error(`Post From Submit Error Headers:`, err.response.headers);
					if (err.response.status === 404) {
						setErrorFetchMessage(() => 'API route not found: 404');
					} else {
						const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
						setErrorFetchMessage(() => errorMessages || 'An unknown error occurred.');
					}
				} else if (err.request) {
					console.error(`Post Form Submit No Response`, err.request);
					setErrorFetchMessage(() => 'API server not responding');
				} else {
					console.error(`Post Form Submit Error Message`, err.message);
				}
				console.error(`Post Form Submit Error Config:`, err.config);
			});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrorImageUploadMessage(() => '');
		const file = e.target.files?.[0];
		if (file) {
			const img = URL.createObjectURL(file);
			const formData = new FormData();
			formData.append('img', file);
			axios
				.post(`${API_URL}/post/add-image`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: TOKEN,
					},
				})
				.then((res) => {
					setValue('img', res.data.path, { shouldValidate: true });
					console.log(res.data.path);
				})
				.catch((err) => {
					console.log('error:', err);
					setErrorImageUploadMessage(() => err.response.data.message);
					setPostImage(() => '/imgs/posts/placeholder.png');
				});
			setPostImage(img);
		}
	};

	useEffect(() => {
		fetchTags();
		setIsPageLoaded(true);
	}, []);

	return (
		<Box>
			<Container>
				<Typography
					variant='h6'
					component='h2'
					align='center'
					sx={{ my: mValue }}
				>
					Create a Post
				</Typography>
				<Paper
					component={'form'}
					variant='outlined'
					square={false}
					sx={{ p: mValue }}
					onSubmit={handleSubmit(handlePostFormSubmit)}
				>
					<Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
						<Box sx={{ flex: 1 }}>
							<TextField
								fullWidth
								label='Title'
								value={titleValue}
								onChange={(e) => {
									const value = e.target.value;
									setTitleValue(() => value);
									setSlugValue(() => value.replace(/ /g, '-'));
									setValue('title', value, { shouldValidate: true });
									setValue('slug', value.replace(/ /g, '-'), {shouldValidate: true})
								}}
								helperText={errors.title ? errors.title.message : ''}
								error={!!errors.title}
								sx={{ mb: mValue }}
							/>
							<TextField
								fullWidth
								label='Slug'
								value={slugValue}
								onChange={(e) => {
									const value = e.target.value;
									setSlugValue(() => value.replace(/ /g, '-'));
									setValue('slug', value.replace(/ /g, '-'), {shouldValidate: true})
								}}
								helperText={errors.slug ? errors.slug.message : ''}
								error={!!errors.slug}
								sx={{ mb: mValue }}
							/>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, width: 'auto', flexShrink: 0, ml: { md: mValue }, justifyContent: { xs: 'space-between', md: 'space-around' } }}>
							<Typography sx={{ display: 'flex', alignItems: 'center' }}>Publish Date:</Typography>
							<Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'center' } }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										disableFuture={true}
										defaultValue={dayjs(currentDate)}
										onChange={(newValue) => {
											if (newValue?.isValid()) {
												setValue('published_at', newValue.toDate());
											}
										}}
										slotProps={{
											textField: {
												error: !!errors.published_at,
												helperText: errors.published_at?.message,
											},
										}}
									/>
								</LocalizationProvider>
							</Box>
						</Box>
					</Container>
					<Divider sx={{ mb: mValue, mt: { xs: mValue, md: 0 } }} />
					<Typography
						variant='subtitle2'
						component='h3'
						align='center'
					>
						Tags
					</Typography>
					<Box>
						<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: mValue }}>
							{fetchedTags?.map((value: TagsType, index: number) => (
								<FormControlLabel
									key={index}
									control={
										<Checkbox
											onClick={() => handleInsertTags(value.name)}
											checked={getValues('tags')?.includes(value.name) || false}
										/>
									}
									label={value.name}
								/>
							))}
						</Box>
					</Box>
					{errors.tags && (
						<Typography
							color='error'
							variant='caption'
							sx={{ textAlign: 'center', display: 'block' }}
						>
							{errors.tags.message}
						</Typography>
					)}
					<Divider sx={{ mb: mValue }} />
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<img
							src={postImage || '/imgs/posts/placeholder.png'}
							alt='placeholder'
							style={{
								width: '100%',
								maxWidth: '800px',
								height: 'auto',
								maxHeight: '300px',
							}}
						/>
					</Box>
					{errors.img && (
						<Typography
							color='error'
							variant='caption'
							sx={{ textAlign: 'center', display: 'block' }}
						>
							{errors.img.message}
						</Typography>
					)}
					{errorImageUploadMessage && (
						<Alert
							variant='outlined'
							severity='error'
							sx={{ mt: mValue }}
						>
							Error: {errorImageUploadMessage}
						</Alert>
					)}
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', my: mValue }}>
						<Button
							component='label'
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<CloudUpload />}
						>
							Upload Image
							<input
								type='file'
								onChange={(e) => handleImageChange(e)}
								style={{ display: 'none' }}
								multiple
							/>
						</Button>
					</Box>
					<Divider sx={{ mb: mValue }} />
					<Box sx={{ height: '360px', mb: mValue }}>
						<MDEditor
							value={bodyValue}
							onChange={(prev?: string) => {
								const value = prev || '';
								setBodyValue(value);
								setValue('body', value, { shouldValidate: true });
							}}
							preview='edit'
							visibleDragbar={false}
							height={340}
							fullscreen={false}
						/>
						{errors.body && (
							<Typography
								color='error'
								variant='caption'
								sx={{ textAlign: 'center', display: 'block' }}
							>
								{errors.body.message}
							</Typography>
						)}
					</Box>
					<Divider sx={{ mb: mValue }} />
					{errorFetchMessage && (
						<Alert
							variant='outlined'
							severity='error'
							sx={{ mb: mValue }}
						>
							{errorFetchMessage}
						</Alert>
					)}
					{successFetchMessage && (
						<Alert
							variant='outlined'
							severity='success'
							sx={{ mb: mValue }}
						>
							{successFetchMessage}
						</Alert>
					)}
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: mValue }}>
						<Button
							variant='contained'
							size='small'
							sx={{ mr: mValue }}
							color='error'
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							size='small'
							sx={{ mr: mValue }}
							type='submit'
						>
							Post
						</Button>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default AddPostForm;

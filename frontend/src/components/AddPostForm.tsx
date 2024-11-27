import { useEffect, useState } from 'react';

import { Box, Container, TextField, Paper, Typography, Divider, Button, FormControlLabel, Checkbox } from '@mui/material';
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

	const mValue: number = 2;
	const currentDate = dayjs();
	const API_URL: string = import.meta.env.VITE_API_URL;

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
			// img: '',
			tags: [],
			published_at: new Date(),
		},
	});

	const handleInsertTags = (tag: string) => {
		const currentTags = getValues('tags') || [];
		const updatedTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
		setValue('tags', updatedTags as [string, ...string[]], { shouldValidate: true });
	};

	const handlePostFormSubmit = (values: z.infer<typeof postFormSchema>) => {
		console.log(values);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const img = URL.createObjectURL(file);
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
								{...register('title')}
								helperText={errors.title ? errors.title.message : ''}
								error={!!errors.title}
								sx={{ mb: mValue }}
							/>
							<TextField
								fullWidth
								label='Slug'
								{...register('slug')}
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
									control={<Checkbox checked={getValues('tags')?.includes(value.name) || false} />}
									label={value.name}
									onClick={() => handleInsertTags(value.name)}
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
								{...register('img', {
									onChange: (e) => {
										handleImageChange(e);
									},
								})}
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

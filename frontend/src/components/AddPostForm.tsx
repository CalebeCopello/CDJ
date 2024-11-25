import { useState } from 'react';

import { Box, Container, TextField, Paper, Typography, Divider, Button, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import MDEditor from '@uiw/react-md-editor';

const AddPostForm = () => {
	const [bodyValue, setBodyValue] = useState<string | undefined>('');
	const [insertTags, setInsertTags] = useState<string[]>([]);

	const mValue: number = 2;
	const currentDate = dayjs();
	const fetchTags = ['PHP', 'JavaScript', 'Laravel', 'React', 'TypeScript', 'Linux'];

	const handleInsertTags = (e: string) => {
		if (!insertTags.includes(e)) {
			setInsertTags((prev) => [...prev, e]);
		}
	};
	console.log(currentDate);

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
				>
					<Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
						<Box sx={{ flex: 1 }}>
							<TextField
								fullWidth
								label='Title'
								sx={{ mb: mValue }}
							/>
							<TextField
								fullWidth
								label='Slug'
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
						<Box
							sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: mValue, }}
						>
							{fetchTags.map((value: string, index: number) => (
								<FormControlLabel
									key={index}
									control={<Checkbox />}
									label={value}
									onClick={() => handleInsertTags(value)}
								/>
							))}
						</Box>
					</Box>
					<Divider sx={{ mb: mValue }} />

					<Divider sx={{ mb: mValue }} />
					<Box sx={{ display: 'flex', justifyContent: 'center', mb: mValue }}>
						<img
							src='/imgs/posts/placeholder.png'
							alt='placeholder'
							style={{
								width: '100%',
								maxWidth: '800px',
								height: 'auto',
								maxHeight: '300px',
							}}
						/>
					</Box>
					<Divider sx={{ mb: mValue }} />
					<Box sx={{ height: '360px' }}>
						<MDEditor
							value={bodyValue}
							onChange={(prev?: string | undefined) => setBodyValue(prev)}
							preview='edit'
							visibleDragbar={false}
							height={340}
							fullscreen={false}
						/>
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

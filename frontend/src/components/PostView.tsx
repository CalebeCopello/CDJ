import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';

import { PostType } from '../libs/types';
import { Box, Chip, Container, Divider, Tooltip, Typography, Paper } from '@mui/material';

interface PostViewProp {
	post: PostType;
}

const PostView: React.FC<PostViewProp> = ({ post }) => {
	const STORAGE_URL: string = import.meta.env.VITE_API_STORAGE_URL;
	const mValue: number = 2;

	return (
		<>
			<Container sx={{ mt: mValue }}>
				<Paper sx={{ p: mValue }}>
					<Typography
						variant='h3'
						component='h1'
						align='center'
					>
						{post?.title}
					</Typography>
					<Typography
						variant='body1'
						align='right'
					>
						<Tooltip
							title={`Published at: ${dayjs(post?.published_at).format('YYYY-MM-DD')}`}
							arrow
						>
							<span>Stardate: {dayjs(post?.published_at).format('YYMM.DD')}</span>
						</Tooltip>
					</Typography>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 0.5 }}>
						{post?.tags.map((tag, index) => (
							<Chip
								key={index}
								variant='outlined'
								label={tag}
							/>
						))}
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center', my: mValue }}>
						<img
							src={`${STORAGE_URL}/${post?.img}`}
							alt='Post Image'
							style={{
								width: '100%',
								maxWidth: '800px',
								height: 'auto',
								maxHeight: '300px',
							}}
						/>
					</Box>
					<Divider sx={{ mb: mValue }} />
					<MDEditor.Markdown source={post?.body} />
				</Paper>
			</Container>
		</>
	);
};

export default PostView;

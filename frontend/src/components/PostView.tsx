import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';

import { PostType } from '../libs/types';
import { Box, Chip, Container, Divider, Tooltip, Typography, Paper } from '@mui/material';

const PostView = () => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [isPostFound, setIsPostFound] = useState<boolean>(false);
	const [postFetched, setPostFetched] = useState<PostType | undefined>();

	const { slug } = useParams();
	const STORAGE_URL: string = import.meta.env.VITE_API_STORAGE_URL;
	const API_URL: string = import.meta.env.VITE_API_URL;
	const mValue: number = 2;

	useEffect(() => {
		setIsPageLoaded(() => true);
		axios
			.get(`${API_URL}/post/get/${slug}`)
			.then((res) => {
				console.log(res);
				setIsPostFound(() => true);
				setPostFetched(() => res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	console.log(dayjs(postFetched?.published_at).format('YYMM.DD'));
	return (
		<>
			{isPageLoaded && isPostFound && (
				<>
					<Container sx={{ mt: mValue }}>
						<Paper sx={{ p: mValue }}>
							<Typography
								variant='h3'
								component='h1'
								align='center'
							>
								{postFetched?.title}
							</Typography>
							<Typography
								variant='body1'
								align='right'
							>
								<Tooltip
									title={`Published at: ${dayjs(postFetched?.published_at).format('YYYY-MM-DD')}`}
									arrow
								>
									<span>Stardate: {dayjs(postFetched?.published_at).format('YYMM.DD')}</span>
								</Tooltip>
							</Typography>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 0.5 }}>
								{postFetched?.tags.map((tag, index) => (
									<Chip
										key={index}
										variant='outlined'
										label={tag}
									/>
								))}
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'center', my: mValue }}>
								<img
									src={`${STORAGE_URL}/${postFetched?.img}`}
									alt='Post Image'
									style={{
										width: '100%',
										maxWidth: '800px',
										height: 'auto',
										maxHeight: '300px',
									}}
								/>
							</Box>
							<Divider sx={{ mb: mValue}} />
							<MDEditor.Markdown source={postFetched?.body} />
						</Paper>
						<Divider sx={{ my: mValue }} />
					</Container>
				</>
			)}
			{isPageLoaded && !isPostFound && (
				<div>
					Post not found. <br /> 404
				</div>
			)}
		</>
	);
};

export default PostView;

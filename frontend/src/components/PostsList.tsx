import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as ReactRouteLink } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid2, Chip, Box, CardActionArea, Link } from '@mui/material';

import { PostType } from '../libs/types';

const PostsList = () => {
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	const [fetchedPosts, setFetchedPosts] = useState<PostType[] | null>(null);

	const STORAGE_URL: string = import.meta.env.VITE_API_STORAGE_URL;
	const API_URL: string = import.meta.env.VITE_API_URL;
	const mValue: number = 2;

	useEffect(() => {
		setIsPageLoaded(true);
		axios
			.get(`${API_URL}/post/get-all`)
			.then((res) => {
				setFetchedPosts(() => res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<Grid2
				container
				spacing={2}
				maxWidth={1200}
				justifyContent='center'
				alignSelf='center'
				sx={{ mt: mValue }}
			>
				{isPageLoaded &&
					fetchedPosts?.map((value: PostType, index) => (
						<Card
							key={index}
							sx={{
								width: 320,
								transition: 'transform 0.1s ease-in-out',
								'&:hover': {
									transform: 'scale(1.03)',
									zIndex: 1000,
								},
							}}
						>
							<CardActionArea>
								<Link 
								component={ReactRouteLink}
								to={`/post/view/${value.slug}`}
								underline='hover'
								>
									<CardMedia
										component='img'
										alt='placeholder'
										height='160'
										image={`${STORAGE_URL}/${value.img}`}
									/>
									<CardHeader
										title={value.title.length > 50 ? `${value.title.slice(0, 110)}...` : value.title}
										titleTypographyProps={{ fontSize: 18, fontWeight: 500 }}
										sx={{ height: 80 }}
									/>
								</Link>
							</CardActionArea>
							<CardContent>
								<Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 0.5 }}>
									{value.tags.map((tag, index) => (
										<Chip
											key={index}
											variant='outlined'
											label={tag}
										/>
									))}
								</Box>
							</CardContent>
							<CardActions sx={{ display: 'flex', justifySelf: 'flex-end', justifyContent: 'end' }}>
								<Button
									size='small'
									variant='contained'
									href={`/post/view/${value.slug}`}
								>
									Read More
								</Button>
							</CardActions>
						</Card>
					))}
			</Grid2>
		</>
	);
};

export default PostsList;

import React from 'react';
import { Link as ReactRouteLink } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid2, Chip, Box, CardActionArea, Link } from '@mui/material';

import { PostType } from '../libs/types';

interface PostListComponentProp {
	fetchedPosts?: PostType;
	isPageLoaded: boolean;
	searchTag: string;
}

const PostListComponent: React.FC<PostListComponentProp> = ({ fetchedPosts, isPageLoaded, searchTag }) => {
	const mValue: number = 2;
	const STORAGE_URL: string = import.meta.env.VITE_API_STORAGE_URL;
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
					fetchedPosts?.map((value: PostType, index: number) => (
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
										<Link
											component={ReactRouteLink}
											to={`/post/bytag/${tag.name}`}
											underline='none'
                                            
										>
											<Chip
												key={index}
												variant='outlined'
												label={tag.name}
											/>
										</Link>
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

export default PostListComponent;

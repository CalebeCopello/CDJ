import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid2, Chip, Box } from '@mui/material';

const PostsList = () => {
	const posts: string[] = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis at orci eu euismod. Donec gravida condimentum velit, ut ultrices orci luctus quis. Sed a nisl augue. Morbi eu justo tempus, laoreet mauris vel, scelerisque dolor.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis at orci eu euismod. Donec gravida condimentum velit, ut ultrices orci luctus quis. Sed a nisl augue. Morbi eu justo tempus, laoreet mauris vel, scelerisque dolor.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis at orci eu euismod. Donec gravida condimentum velit, ut ultrices orci luctus quis. Sed a nisl augue. Morbi eu justo tempus, laoreet mauris vel, scelerisque dolor.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis at orci eu euismod. Donec gravida condimentum velit, ut ultrices orci luctus quis. Sed a nisl augue. Morbi eu justo tempus, laoreet mauris vel, scelerisque dolor.', '42', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
	const tags: string[] = ['PHP', 'JavaScript', 'TypeScript', 'ReactJS'];
	const mValue: number = 2;
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
				{posts.map((value, index) => (
					<Card
						key={index}
						sx={{
							maxWidth: 380,
							transition: 'transform 0.1s ease-in-out',
							'&:hover': {
								transform: 'scale(1.03)',
								zIndex: 1000,
							},
						}}
					>
						<CardMedia
							component='img'
							alt='placeholder'
							height='160'
							image='/imgs/posts/placeholder.png'
						/>
						<CardHeader
							title={value.length > 50 ? `${value.slice(0, 110)}...` : value}
							titleTypographyProps={{ fontSize: 18, fontWeight: 500 }}
							sx={{ height: 80 }}
						/>
						<CardContent>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 0.5 }}>
								{tags.map((tag, index) => (
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

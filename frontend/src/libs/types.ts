interface PostType {
	body: string,
	created_at: Date,
	id: number,
	img: string,
	is_published?: boolean,
	published_at: Date,
	slug: string,
	title: string,
	updated_at: Date,
	user_id: number,
	tags: string[],
}

export type { PostType }
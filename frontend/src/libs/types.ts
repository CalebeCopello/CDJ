interface PostType {
	body: string;
	id: number;
	img: string;
	is_published?: boolean;
	published_at: Date;
	slug: string;
	title: string;
	user_id: number;
	tags: string[];
	created_at: Date;
	updated_at: Date;
}

interface CommentType {
	id: number;
	comment: string;
	is_visible: boolean;
	parent_id: number | null;
	user_id: number;
	created_at: Date;
	updated_at: Date;
}

export type { PostType, CommentType };

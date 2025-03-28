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
	username: string;
	created_at: Date;
	updated_at: Date;
}

interface LikesType {
	id: number;
	user_id: number;
	comment_id: number;
	like_value: number;
	created_at: Date;
	updated_at: Date;
}

interface UserInfoType {
	id: number;
	username: string;
	email: string;
	is_admin: boolean;
	email_verified_at: Date;
	created_at: Date;
	updated_at: Date;
}

interface UserCommentsType {
	comment: string;
	post: string;
	slug: string;
	date: Date;
}

interface UserLikesType {
	username: string;
	value: number;
	post: string;
	slug: string;
	date: Date;
}

export type { PostType, CommentType, LikesType, UserInfoType, UserCommentsType, UserLikesType };

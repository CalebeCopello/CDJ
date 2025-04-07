interface PostType {
	body: string;
	id: number;
	img: string;
	is_published?: boolean;
	published_at: Date;
	slug: string;
	title: string;
	user_id: number;
	tags: TagType[];
	created_at: Date;
	updated_at: Date;
}

interface TagType {
	id: number;
	name: string;
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
	email?: string;
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

interface CommentInfoType {
	comment: {
		value: string;
		date: Date;
	};
	post: {
		title: string;
		slug: string;
		date: Date;
		username: string;
	};
	reply: {
		comment?: string;
		username?: string;
	};
}
interface LikesInfoType {
	comment: {
		comment: string;
		username: string;
	};
	like: {
		value: number;
		date: Date;
	};
	post: {
		slug: string;
		title: string;
		username: string;
	};
}

export type { PostType, TagType, CommentType, LikesType, UserInfoType, UserCommentsType, UserLikesType, CommentInfoType, LikesInfoType };

export interface IPost {
	_id: string;
	title: string;
	source: string;
	country: string;
	imgUrl: string;
	userId: string;
	created: string;
	body?: string;
	comments?: IComment[];
}
 
export type IPostInput = Pick<IPost, "title" | "source" | "country" | "imgUrl" | "userId" | "body" | "comments">

export interface IComment {
	text: string;
	userId: string;
	created: string;
}

export type ICommentInput = Pick<IComment, "userId" | "text">
export interface IPost {
	_id: string;
	title: string;
	source: string;
	country: string;
	body: string;
	imgUrl: string;
	comments: IComment[];
	userId: string;
	created: string;
}

export interface IComment {
	text: string;
	userId: string;
	created: Date;
}
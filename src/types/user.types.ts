export interface IUser {
	_id?: string;
	password: string;
	email: string;
	name?: string;
	imgUrl?: string;
	tokens?: string[];
}

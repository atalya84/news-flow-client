export interface IUser {
	_id?: string;
	email: string;
	name?: string;
  	password?: string;
	imgUrl?: string;
	tokens?: string[];
}

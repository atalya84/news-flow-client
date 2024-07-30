import { IPost } from '../../types/feed';
import { createContext, Dispatch, SetStateAction } from 'react';

export const PostContext = createContext<{
	post: IPost | undefined;
	setPost: Dispatch<SetStateAction<IPost | undefined>>;
} | null>(null);
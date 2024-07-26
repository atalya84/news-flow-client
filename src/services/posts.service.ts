import axios from 'axios';
import { IPost } from '../types/feed.types';

const client = axios.create({
	baseURL: 'http://localhost:4000/posts',
});

export const fetchPosts = async (): Promise<IPost[]> =>
	(await client.get<IPost[]>('/')).data;

export const fetchPost = async (postId: string): Promise<IPost> =>
	(await client.get<IPost>(`/${postId}`)).data;
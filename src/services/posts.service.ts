import axios from 'axios';
import { IPost, IPostInput } from '../types/feed.types';

const client = axios.create({
	baseURL: 'http://localhost:4000/posts',
});

export const fetchPosts = async (): Promise<IPost[]> =>
	(await client.get<IPost[]>('/')).data;

export const fetchPost = async (postId: string): Promise<IPost> =>
	(await client.get<IPost>(`/${postId}`)).data;

export const createPost = async (postInput: IPostInput): Promise<IPost> =>
	(await client.post<IPost>('/', postInput)).data;

export const updatePost = async (
	postId: string,
	postData: IPostInput,
): Promise<IPost> => (await client.put<IPost>(`/${postId}`, postData)).data;

export const deletePost = async (postId: string): Promise<void> => {
	(await client.delete(`/${postId}`)).data;
};
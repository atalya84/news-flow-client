import { ICommentInput, IPost, IPostInput } from '../types/feed';
import { Comments } from '../ui/Comments/Comments';
import apiClient from './api-client';

export const fetchPosts = async (): Promise<IPost[]> =>
	(await apiClient.get<IPost[]>('/posts')).data;

export const fetchUserPosts = async (userId: string): Promise<IPost[]> =>
	(await apiClient.get<IPost[]>(`/users/${userId}/posts`)).data;

export const fetchPopPosts = async (userId: string): Promise<IPost[]> =>
	(await fetchUserPosts(userId))
		.sort((a, b) => b.comments!.length - a.comments!.length)
		.slice(0, 3);

export const fetchPost = async (postId: string): Promise<IPost> =>
	(await apiClient.get<IPost>(`/posts/${postId}`)).data;

export const createPost = async (postInput: IPostInput): Promise<IPost> =>
	(await apiClient.post<IPost>('/posts', postInput)).data;

export const updatePost = async (
	postId: string,
	postData: IPostInput,
): Promise<IPost> =>
	(await apiClient.put<IPost>(`/posts/${postId}`, postData)).data;

export const deletePost = async (postId: string): Promise<void> =>
	(await apiClient.delete(`/posts/${postId}`)).data;

export const createComment = async (
	postId: string,
	commentInput: ICommentInput,
): Promise<IPost> =>
	(await apiClient.post(`/posts/${postId}/comments`, commentInput)).data;
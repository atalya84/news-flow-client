import apiClient from './api-client';
import { IUploadResponse } from '../types/File';

export async function uploadPhoto(formData: FormData): Promise<string> {
	try {
		const response = await apiClient.post<IUploadResponse>(
			'/file/uploadProfile',
			formData,
		);
		return response.data.imgUrl;
	} catch (error) {
		console.log('error:', error);
		throw new Error('Failed to upload photo.');
	}
}

export const uploadPostImage = async (formData: FormData): Promise<string> =>
	(await apiClient.post<IUploadResponse>('/file/uploadPost', formData)).data
		.imgUrl;
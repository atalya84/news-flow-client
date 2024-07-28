import apiClient from './api-client';
import { IUploadResponse } from '../types/File';
import axios from 'axios';

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
	(
		await axios.post<IUploadResponse>(
			'http://localhost:4000/file/uploadPost',
			formData,
		)
	).data.imgUrl;
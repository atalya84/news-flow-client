export const getFileExt = (filename?: string): string => {
	if (!filename) return '';
	const arr = filename.split('.');
	return arr[arr.length - 1];
};
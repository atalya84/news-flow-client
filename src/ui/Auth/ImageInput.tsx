import React, { useRef, useState, FC, useEffect } from 'react';
import { ImageInputProps } from '../../types/Props';

import '../default.css';

const DropFileInput: FC<ImageInputProps> = ({ onChange, error, src }) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const [imageSrc, setImageSrc] = useState<string | null>(null);

	const onDragEnter = () => wrapperRef.current?.classList.add('dragover');

	const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

	const onDrop = () => wrapperRef.current?.classList.remove('dragover');

	const onFileDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFile = event.target.files?.[0];
		if (newFile) {
			onChange(newFile);
			if (newFile.type === 'image/jpeg' || newFile.type === 'image/png') {
				const reader = new FileReader();
				reader.onloadend = () => {
					setImageSrc(reader.result as string);
				};
				reader.readAsDataURL(newFile);
			}
		}
	};

	useEffect(() => {
		if (src) setImageSrc(src);
	}, [src]);

	return (
		<>
			<div
				ref={wrapperRef}
				className="drop-file-input"
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
			>
				<div className="drop-file-input__label">
					{imageSrc ? (
						<img src={imageSrc} alt="Selected" className="selected-image" />
					) : error ? (
						<img src={'imageError.png'} alt="Error" className="preview-image" />
					) : (
						<img src={'addImage.png'} alt="Upload" className="preview-image" />
					)}
				</div>
				<input
					type="file"
					accept="image/jpeg, image/png"
					onChange={onFileDrop}
				/>
			</div>
		</>
	);
};

export default DropFileInput;
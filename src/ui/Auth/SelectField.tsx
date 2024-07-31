import TextField from '@mui/material/TextField';
import React, { FC, useCallback } from 'react';
import { Icon, InputAdornment } from '@mui/material';
import { TextFieldProps } from '../../types/Props';
import '../../ui/default.css';

const TextInput: FC<TextFieldProps> = ({
	value,
	type = 'select',
	title,
	icon,
	className,
	onChange,
	isValueValid = true,
	errorText = '',
}) => {
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(e.target.value);
		},
		[onChange],
	);

	return (
		<TextField
			error={!isValueValid}
			helperText={errorText}
			className={`select-field ${className}`}
			variant="standard"
			label={title}
			value={value}
			onChange={handleChange}
			type={type}
			InputProps={{
				startAdornment: (
					<InputAdornment position="end">
						<Icon sx={{ marginRight: '10px' }}>{icon}</Icon>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default TextInput;
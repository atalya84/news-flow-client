import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC, useState, useEffect, useMemo, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { IPost, IPostInput } from '../../types/feed';
import { createPost, updatePost } from '../../services/posts.service';
import TextInput from '../../ui/Auth/TextField';
import DropFileInput from '../../ui/Auth/ImageInput';
import { uploadPostImage } from '../../services/file-service';
import { getFileExt } from '../../utils';
import axios from 'axios';
import { AuthContext } from '../../Context';
import { Public, Title, Link, Notes, Height } from '@mui/icons-material';
import { createButtonStyle } from '../../ui/app/styles';
import Select, {
	SingleValue,
	components,
	SingleValueProps,
	DropdownIndicatorProps,
	ControlProps,
} from 'react-select';
import { Icon, InputAdornment } from '@mui/material';
import '../../ui/PostMenu/postStyles.css';
import countryList from 'react-select-country-list';
import { config } from '../../config/config';

interface OptionType {
	value: string;
	label: string;
}
export const Submit: FC = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { state }: { state: { post: IPost } } = useLocation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [source, setSource] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [imageInfo, setImageInfo] = useState<File | null>(null);
	const [imgUrl, setImgUrl] = useState<string>('');
	const options: OptionType[] = useMemo(
		() =>
			countryList()
				.getData()
				.map((country) => ({
					value: country.label,
					label: country.label,
				})),
		[],
	);

	useEffect(() => {
		if (!user) {
			const storedUser = JSON.parse(localStorage.getItem('user')!);
			if (!storedUser) {
				navigate('/login');
			}
		}
	}, [user, navigate]);

	useEffect(() => {
		if (state?.post) {
			setIsEdit(true);
			setTitle(state.post.title);
			setCountry(state.post.country);
			setSource(state.post.source);
			setBody(state.post.body || '');
			setImgUrl(state.post.imgUrl);
		}
	}, []);

	const countryChangeHandler = (selectedOption: SingleValue<OptionType>) => {
		// Only set the value of the selected option, not the entire object
		setCountry(selectedOption ? selectedOption.value : null);
	};

	const selectedCountry = useMemo(
		() => options.find((option) => option.label === country) || null,
		[country, options],
	);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			let newImgUrl: string = imgUrl;
			if (imageInfo) {
				const formData = new FormData();
				formData.append(
					'file',
					imageInfo!,
					user?._id + '.' + getFileExt(imageInfo?.name),
				);
				newImgUrl = await uploadPostImage(formData);
			}
			const postInput: IPostInput = {
				title,
				country,
				source,
				body,
				imgUrl: `${config.DOMAIN_BASE}/posts/${newImgUrl}`,
				userId: user?._id ?? '',
			};
			const postId: string = state?.post
				? (
						await updatePost(state.post._id, {
							...state.post,
							...postInput,
						})
					)._id
				: (await createPost(postInput))._id;
			navigate(`/posts/${postId}`);
		} catch (err: any) {
			if (axios.isAxiosError(err)) console.error(err.message);
			else console.error(err);
		} finally {
			setIsLoading(false);
		}
	};
	const CustomSingleValue = (props: SingleValueProps<OptionType>) => (
		<components.SingleValue {...props}>
			{props.data.label}
		</components.SingleValue>
	);

	// Custom DropdownIndicator component to display an icon
	const CustomDropdownIndicator = (
		props: DropdownIndicatorProps<OptionType>,
	) => <components.DropdownIndicator {...props}></components.DropdownIndicator>;
	const CustomControl = (props: ControlProps<OptionType, false>) => (
		<components.Control {...props}>
			<InputAdornment position="start" sx={{ marginLeft: '10px' }}>
				<Public />
			</InputAdornment>
			{props.children}
		</components.Control>
	);

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			borderRadius: '50px',
			height: '45px',
		}),
	};
	return (
		<Grid container justifyContent={'center'} sx={{ marginTop: '1rem' }}>
			<Grid item container rowSpacing={2} xl={6} lg={11}>
				<Grid item xs={12}>
					<Typography variant="h4">
						{isEdit ? 'Edit Post' : 'Create Post'}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextInput
						title="Title"
						value={title}
						onChange={setTitle}
						icon={<Title />}
					/>
				</Grid>
				<Grid item xs={7.2}>
					<div className="select-label-style">Country</div>
					<div className="select-style">
						<Select
							options={options}
							value={selectedCountry}
							onChange={countryChangeHandler}
							styles={customStyles}
							components={{
								SingleValue: CustomSingleValue,
								DropdownIndicator: CustomDropdownIndicator,
								Control: CustomControl,
							}}
						/>
					</div>
				</Grid>
				<Grid item xs={12}>
					<TextInput
						title="Link URL"
						value={source}
						onChange={setSource}
						icon={<Link />}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextInput
						title="Body"
						value={body}
						onChange={setBody}
						icon={<Notes />}
					/>
				</Grid>
				<Grid item xs={12}>
					<DropFileInput src={imgUrl} onChange={setImageInfo} error={false} />
				</Grid>
				<Grid item xs={12}>
					<Stack spacing={2} direction="row">
						<Button
							variant="outlined"
							onClick={handleSubmit}
							sx={createButtonStyle}
						>
							{isEdit ? 'Edit' : 'Post'}
						</Button>
						<Button
							variant="outlined"
							color="error"
							sx={{ borderRadius: '2rem' }}
							onClick={() => navigate('/')}
						>
							Cancel
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	);
};
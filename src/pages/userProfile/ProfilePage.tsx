import { FC, useContext, useEffect, useState } from 'react';
import DropFileInput from '../../ui/Auth/ImageInput';
import { AuthContext } from '../../Context';
import { config } from '../../config/config';
import GradientRectangle from '../../ui/Auth/GradientRectangle';
import './ProfilePage.css';
import { Grid } from '@mui/material';
import { PopularPosts } from '../myPosts/PopularPosts';
import { LoadingButton } from '@mui/lab';
import { editUser, signOut } from '../../services/auth.service';
import { logoutButton, editButton } from './styles';
import { useNavigate } from 'react-router';
import TextInput from '../../ui/Auth/TextField';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FieldValidation } from '../../types/validation';
import { getFileExt } from '../../utils';
import { uploadPhoto } from '../../services/file-service';
import { IUser } from '../../types/user.types';

export const ProfilePage: FC = () => {
	const currentUser = useContext(AuthContext).user;
	const [imageInfo, setImageInfo] = useState<File | null>(null);
	const { setUser } = useContext(AuthContext);
	const [edit, setEdit] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [imgUrl, setImgUrl] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [emailValid, setEmailValid] = useState<FieldValidation>({
		isValid: true,
		errorText: '',
	});
	const [nameValid, setNameValid] = useState<FieldValidation>({
		isValid: true,
		errorText: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			const storedUser = JSON.parse(localStorage.getItem('user')!);
			if (!storedUser) {
				navigate('/login');
			}
		} else {
			setImgUrl(currentUser.imgUrl!);
			setEmail(currentUser.email);
			setName(currentUser.name!);
		}
	}, [currentUser, navigate]);

	if (!currentUser) {
		return <div>Loading...</div>;
	}

	const handleEditMode = () => {
		setEdit(!edit);
	};

	const handleProfilePic = async (): Promise<string> => {
		try {
			const formData: FormData = new FormData();
			formData.append(
				'file',
				imageInfo!,
				'profile.' + getFileExt(imageInfo?.name),
			);
			const url = await uploadPhoto(formData);
			if (!url) {
				console.log('image was not uploaded');
			}
			return url;
		} catch (error) {
			console.error('Error uploading image:', error);
			return '';
		}
	};

	const handleEditUser = async () => {
		setLoading(true);

		var imageUrl;
		var user: IUser | null = null;
		if (imageInfo) {
			imageUrl = await handleProfilePic();
			if (imageUrl) {
				user = {
					_id: currentUser._id,
					email: email,
					name: name,
					imgUrl: imageUrl,
				};
			} else {
				alert('There was an error when uploading your profile picture');
			}
		} else {
			user = {
				_id: currentUser._id,
				email: email,
				name: name,
			};
		}

		if (user) {
			try {
				const updatedUser: IUser = await editUser(user);
				if (updatedUser) {
					setUser(updatedUser);
					setEdit(false);
				}
			} catch (error) {
				console.log('error in profilePage:', error);
			}
		}
		setLoading(false);
	};

	const isEmailValid = (email: string): boolean => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validateForm = () => {
		var shouldUpdateUser: boolean = false;

		if (email !== currentUser.email) {
			if (email.length === 0) {
				setEmailValid({ isValid: false, errorText: "Email can't be empty" });
			} else if (!isEmailValid(email)) {
				setEmailValid({ isValid: false, errorText: 'Email format is wrong' });
			} else {
				shouldUpdateUser = true;
				setEmailValid({ isValid: true, errorText: '' });
			}
		}

		if (name !== currentUser.name) {
			if (name.length === 0) {
				setNameValid({ isValid: false, errorText: "User Name can't be empty" });
			} else {
				shouldUpdateUser = true;
				setNameValid({ isValid: true, errorText: '' });
			}
		}

		if (shouldUpdateUser || imageInfo) {
			handleEditUser();
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={1} />
			<Grid item xs={7}>
				<div className="profile-page-container">
					<GradientRectangle />
					{edit ? (
						<DropFileInput
							onChange={setImageInfo}
							src={imgUrl}
							className="profile-edit"
						/>
					) : (
						<DropFileInput
							onChange={setImageInfo}
							src={imgUrl}
							className="profile-input"
							disabled={true}
						/>
					)}
				</div>
				{edit ? (
					<>
						<div className="user-form">
							<TextInput
								icon={<AccountCircleIcon />}
								className="fields"
								title="Change your name"
								value={name}
								onChange={setName}
								isValueValid={nameValid.isValid}
								errorText={nameValid.errorText}
							/>
							<TextInput
								icon={<AlternateEmailIcon />}
								className="fields"
								title="Change your Email"
								type="email"
								value={email}
								onChange={setEmail}
								isValueValid={emailValid.isValid}
								errorText={emailValid.errorText}
							/>
						</div>
						<LoadingButton
							sx={editButton}
							onClick={validateForm}
							loading={loading}
							loadingPosition="end"
							variant="contained"
						>
							save
						</LoadingButton>
					</>
				) : (
					<>
						<div className="user-details">
							<h1>{currentUser.name}</h1>
							<h2>{currentUser.email}</h2>
						</div>
						<LoadingButton
							sx={editButton}
							onClick={handleEditMode}
							loadingPosition="end"
							variant="contained"
						>
							Edit
						</LoadingButton>
					</>
				)}
				<LoadingButton
					sx={logoutButton}
					onClick={signOut}
					loadingPosition="end"
					variant="contained"
				>
					Log Out
				</LoadingButton>
			</Grid>
			<Grid item xs={4}>
				<div className="popular-container">
					<h1>Your Popular Posts</h1>
					<PopularPosts />
				</div>
			</Grid>
		</Grid>
	);
};
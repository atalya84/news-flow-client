import './Navbar.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { FC, useCallback, useState } from 'react';
import { Button, ButtonProps, Divider, Stack, SxProps } from '@mui/material';
import { createButtonStyle, navButtonStyle, selectedNavButton } from './styles';
import { Add } from '@mui/icons-material';

enum NavOptions {
	NONE,
	FEED,
	MY_POSTS,
}

export const Navbar = () => {
	const navigate = useNavigate();
	const goToHomePage = useCallback(() => {
		setselected(NavOptions.FEED);
		navigate('/');
	}, []);
	const goToMyPosts = useCallback(() => {
		setselected(NavOptions.MY_POSTS);
		navigate('/posts/self');
	}, []);
	const goToCreatePost = useCallback(() => {
		setselected(NavOptions.NONE);
		navigate('/posts/submit');
	}, []);

	const [selected, setselected] = useState<NavOptions>(NavOptions.FEED);

	const NavButton: FC<ButtonProps & { page: NavOptions }> = (props) => {
		const { page, ...buttonProps } = props;
		return (
			<Button
				variant="outlined"
				sx={page === selected ? selectedNavButton : navButtonStyle}
				{...buttonProps}
			>
				{props.children}
			</Button>
		);
	};

	return (
		<>
			<div className="navbar">
				<Stack direction={'row'}>
					<AppLogo onClick={goToHomePage} />
					<NavButton page={NavOptions.FEED} onClick={goToHomePage}>
						Feed
					</NavButton>
					<NavButton page={NavOptions.MY_POSTS} onClick={goToMyPosts}>
						My Posts
					</NavButton>
				</Stack>
				<Button
					startIcon={<Add />}
					sx={createButtonStyle}
					onClick={goToCreatePost}
					variant="outlined"
				>
					Create
				</Button>
			</div>
			<Outlet />
		</>
	);
};
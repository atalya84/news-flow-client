import './Navbar.css';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button, ButtonProps, Stack } from '@mui/material';
import { createButtonStyle, navButtonStyle, selectedNavButton } from './styles';
import { Add } from '@mui/icons-material';
import { ReturnToHomePage } from './GoToHomePage';

enum NavOptions {
	NONE,
	FEED = '/',
	MY_POSTS = '/posts/self',
	PROFILE = '/profile',
  }
  
  export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { navigateToHomePage } = ReturnToHomePage();
  
	const [selected, setSelected] = useState<NavOptions>(NavOptions.NONE);
  
	useEffect(() => {
	  const path = location.pathname as NavOptions;
	  setSelected(path);
	}, [location.pathname]);
  
	const goToHomePage = useCallback(() => {
	  setSelected(NavOptions.FEED);
	  navigateToHomePage();
	}, [navigateToHomePage]);
  
	const goToMyPosts = useCallback(() => {
	  setSelected(NavOptions.MY_POSTS);
	  navigate('/posts/self');
	}, [navigate]);
  
	const goToCreatePost = useCallback(() => {
	  setSelected(NavOptions.NONE);
	  navigate('/posts/submit');
	}, [navigate]);
  
	const goToUserProfile = useCallback(() => {
	  setSelected(NavOptions.PROFILE);
	  navigate('/profile');
	}, [navigate]);
  
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
			<NavButton page={NavOptions.PROFILE} onClick={goToUserProfile}>
			  Profile
			</NavButton>
		  </Stack>
		  <Button
			endIcon={<Add />}
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
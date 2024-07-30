import './Navbar.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { useCallback } from 'react';
import { Button } from '@mui/material';

export const Navbar = () => {
	const navigate = useNavigate();
	const goToHomePage = useCallback(() => navigate('/'), []);
	const goToCreatePost = useCallback(() => navigate('/posts/submit'), []);
	const goToUserProfile = useCallback(() => navigate('/profile'), []);

	return (
		<>
			<div className="navbar">
				<AppLogo onClick={goToHomePage} />
				<Button onClick={goToCreatePost} variant="contained">
					Create
				</Button>
				<Button onClick={goToUserProfile} variant="contained">
					Profile
				</Button>
			</div>
			<Outlet />
		</>
	);
};
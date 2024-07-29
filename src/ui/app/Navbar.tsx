import './Navbar.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { useCallback } from 'react';
import { Button } from '@mui/material';

export const Navbar = () => {
	const navigate = useNavigate();
	const goToHomePage = useCallback(() => navigate('/'), []);
	const goToCreatePost = useCallback(() => navigate('/posts/submit'), []);

	return (
		<>
			<div className="navbar">
				<AppLogo onClick={goToHomePage} />
				<Button onClick={goToCreatePost} variant="contained">
					Create
				</Button>
			</div>
			<Outlet />
		</>
	);
};
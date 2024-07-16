import './Navbar.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { useCallback } from 'react';

export const Navbar = () => {
	const navigate = useNavigate();
	const goToHomePage = useCallback(() => navigate('/'), []);

	return (
		<>
			<div className="navbar">
				<AppLogo onClick={goToHomePage} />
			</div>
			<Outlet />
		</>
	);
};
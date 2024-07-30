import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Router } from './Router';
import { useState, useEffect } from 'react';
import { getActiveUser } from './services/auth.service';
import { IUser } from './types/user.types';
import { AuthContext } from './Context';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

function App() {
	const [user, setUser] = useState<IUser | null | undefined>()
  
	  const setActiveUser = async () => {

		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			const parsedUser: IUser = JSON.parse(storedUser);
			setUser(parsedUser);
			console.log("parsedUser", parsedUser)
		} else {
			const activeUser = await getActiveUser();
    		setUser(activeUser);
		}
	  }
  
	  useEffect(() => {
		setActiveUser()
		console.log("user", user);
	  }, [])
  
	return (
	  <div className="news-flow-app">
		<AuthContext.Provider value={{user, setUser}}>
		  <GoogleOAuthProvider clientId="844336525550-qe2lm7m034t7m25dsr8gn70e33eq3gp5.apps.googleusercontent.com">
			<ThemeProvider theme={lightTheme}>
			  <Router />
			</ThemeProvider>
		  </GoogleOAuthProvider>
		</AuthContext.Provider>
	  </div>
	);
  }
  
  export default App;
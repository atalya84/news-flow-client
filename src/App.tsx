import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Router } from './Router';

const lightTheme = createTheme({
  palette: {
      mode: 'light',
  },
});

function App() {
  return (
    <div className="news-flow-app">
      <GoogleOAuthProvider clientId="844336525550-qe2lm7m034t7m25dsr8gn70e33eq3gp5.apps.googleusercontent.com">
        <ThemeProvider theme={lightTheme}>
          <Router />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;

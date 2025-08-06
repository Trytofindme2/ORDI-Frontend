import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import routes from './router/routes';
import { RouterProvider } from 'react-router-dom';
import { VerificationContextProvider } from './context/verificationContext';
import { AuthContextProvider } from './context/authContext';
import { ThemeProvider } from './context/themeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <VerificationContextProvider>
        <ThemeProvider>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </VerificationContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);

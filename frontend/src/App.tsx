import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RequireAuth } from 'components/require-auth/require-auth';
import { ChatPage } from 'pages/chat-page';
import { LoginPage } from 'pages/login-page';
import { NotFoundPage } from 'pages/not-found-page';
import { SignupPage } from 'pages/signup-page';
import { routes } from 'core/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.chat()}
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        />
        <Route path={routes.login()} element={<LoginPage />} />
        <Route path={routes.signup()} element={<SignupPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

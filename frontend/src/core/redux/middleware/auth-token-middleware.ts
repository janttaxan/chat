import { Middleware } from 'redux';

import { signout, signup, signin } from 'core/redux/slices/user-slice';

export const authTokenMiddleware: Middleware = () => (next) => (action) => {
  if (action.type === `${signin.typePrefix}/fulfilled` || action.type === `${signup.typePrefix}/fulfilled`) {
    localStorage.setItem('token', action.payload.token);
    localStorage.setItem('username', action.payload.username);
  }
  if (action.type === signout.type) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  return next(action);
};

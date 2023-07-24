import { Middleware } from 'redux';

import { clearUserData, signup, signin } from 'core/redux/slices/user-slice';

export const authTokenMiddleware: Middleware = () => (next) => (action) => {
  console.log(action.type);

  if (action.type === `${signin.typePrefix}/fulfilled` || action.type === `${signup.typePrefix}/fulfilled`) {
    localStorage.setItem('token', action.payload.token);
    localStorage.setItem('username', action.payload.username);
  }
  if (action.type === clearUserData.type) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  return next(action);
};

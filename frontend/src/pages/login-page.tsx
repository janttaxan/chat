import { Link, Navigate } from 'react-router-dom';

import { useAuth } from 'core/hooks/auth';
import { routes } from 'core/routes';

import { Layout } from 'components/layout/layout';
import { AuthForm } from 'components/auth-form/auth-form';

export function LoginPage() {
  const { user, signin } = useAuth();

  if (user.isAuth) {
    return <Navigate to={routes.chat()} />;
  }

  return (
    <Layout>
      <>
        <h3>Login Page</h3>
        <Link to={routes.signup()}>signup</Link>
        <div>
          <AuthForm onSubmit={signin} />
        </div>
      </>
    </Layout>
  );
}

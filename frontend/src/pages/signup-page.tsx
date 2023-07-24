import { Link, Navigate } from 'react-router-dom';

import { useAuth } from 'core/hooks/auth';
import { routes } from 'core/routes';

import { Layout } from 'components/layout/layout';
import { AuthForm } from 'components/auth-form/auth-form';

export function SignupPage() {
  const { user, signup } = useAuth();

  if (user.isAuth) {
    return <Navigate to={routes.chat()} />;
  }

  return (
    <Layout>
      <>
        <h3>Signup Page</h3>
        <div>
          <div>
            <Link to={routes.login()}>login</Link>
          </div>
          <AuthForm onSubmit={signup} />
        </div>
      </>
    </Layout>
  );
}

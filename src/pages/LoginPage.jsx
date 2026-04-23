import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAppContext from '../context/useAppContext.js';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppContext();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await login(formValues);
      navigate(location.state?.from || '/profile');
    } catch (error) {
      setErrorMessage(error.message || 'Unable to log in right now.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--compact">
        <div className="auth-card__shell">
          <div className="auth-card__panel">
            <p className="eyebrow">Welcome back</p>
            <h1>Log in to your profile</h1>
            <p>
              Use the credentials you created in this browser. Everything stays
              local to this device.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="form-field">
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
              </label>

              {errorMessage ? (
                <p className="form-feedback form-feedback--error">{errorMessage}</p>
              ) : null}

              <button className="button button--primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </form>

            <p className="auth-card__switch">
              Don&apos;t have an account yet? <Link to="/signup">Create one here.</Link>
            </p>
          </div>
        </div>

        <img className="auth-pet auth-pet--left" src="/images/miguel.png" alt="" />
        <img className="auth-pet auth-pet--top" src="/images/nomin.png" alt="" />
        <img className="auth-pet auth-pet--right" src="/images/leila.png" alt="" />
      </div>
    </section>
  );
}

export default LoginPage;

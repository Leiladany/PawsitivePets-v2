import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAppContext from '../context/useAppContext.js';

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAppContext();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
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
      await signup(formValues);
      navigate('/profile');
    } catch (error) {
      setErrorMessage(error.message || 'Unable to create your profile right now.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__shell">
          <div className="auth-card__panel">
            <p className="eyebrow">Create Your Account</p>
            <h1>Sign up for Pawsitive Pets</h1>
            <p>
              This local demo keeps your account in browser storage only, so it is
              perfect for testing and play.
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
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
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
                {isSubmitting ? 'Creating...' : 'Sign Up'}
              </button>
            </form>

            <p className="auth-card__switch">
              Already have an account? <Link to="/login">Log in here.</Link>
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

export default SignupPage;

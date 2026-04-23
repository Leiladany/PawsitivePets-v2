import { Link } from 'react-router-dom';
import useAppContext from '../context/useAppContext.js';

function HomePage() {
  const { currentUser } = useAppContext();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-section__content">
          <p className="eyebrow">Pet care made simpler</p>
          <h1>The only pet website you will ever need!</h1>
          <p className="hero-section__text">
            Build a small pet profile, add health reminders, and test the whole
            experience locally without a backend or database.
          </p>

          <div className="hero-section__actions">
            <Link
              className="button button--primary"
              to={currentUser ? '/profile' : '/signup'}
            >
              {currentUser ? 'Go to My Profile >' : 'Create Your Profile >'}
            </Link>
          </div>
        </div>

        <div className="hero-section__image">
          <img src="/images/homepageimg.png" alt="Dog and cat hero illustration" />
        </div>
      </section>

      <section className="quote-band">
        <blockquote>
          <p>
            &quot;Pets are humanizing. They remind us we have an obligation and
            responsibility to preserve and nurture and care for all life.&quot;
          </p>
          <footer>James Cromwell</footer>
        </blockquote>
      </section>

      <section className="about-section">
        <div className="about-section__image">
          <img src="/images/homepageimg2.png" alt="Pet owner with cat illustration" />
        </div>

        <div className="about-section__content">
          <p className="eyebrow">About Us</p>
          <h2>A small playground for pet lovers</h2>
          <p>
            This version of Pawsitive Pets keeps the same spirit as your original
            school project, but it now runs as a frontend-only demo. You can sign
            up, log in, add pets, edit them, and remove them, with every action
            saved directly in local storage.
          </p>
          <p>
            That makes it easy to test flows, polish the interface, and keep
            iterating on the idea without relying on a backend while you decide
            what the final stack should be.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

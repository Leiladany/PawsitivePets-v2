import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="info-card-page">
      <div className="info-card">
        <p className="eyebrow">404</p>
        <h1>This page does not exist</h1>
        <p>
          The route you requested is not available in this local demo. Go back home
          and continue testing from there.
        </p>
        <Link className="button button--primary" to="/">
          Return Home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;

import { Link } from 'react-router-dom';

function EmptyState({ title, text, actionLabel, actionTo }) {
  return (
    <section className="empty-state">
      <div className="empty-state__content">
        <img
          className="empty-state__image"
          src="/images/pup.png"
          alt="Happy pet illustration"
        />
        <h2>{title}</h2>
        <p>{text}</p>
        <Link className="button button--primary" to={actionTo}>
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}

export default EmptyState;

import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard.jsx';
import useAppContext from '../context/useAppContext.js';

function ProfilePage() {
  const { currentUser, userPets } = useAppContext();
  const recentPets = userPets.slice(0, 2);

  return (
    <section className="profile-page">
      <div className="profile-banner">
        <p className="eyebrow">Profile</p>
        <h1>How are you today {currentUser?.username}?</h1>
        <p>
          Your account, session, and pets are all stored locally in this browser so
          you can experiment safely with the full flow.
        </p>
      </div>

      <div className="profile-actions">
        <Link className="profile-action-card" to="/pets/new">
          <img src="/images/plus.svg" alt="" />
          <div>
            <h2>Add Pet</h2>
            <p>Create a new pet record and save it to local storage.</p>
          </div>
        </Link>

        <Link className="profile-action-card" to="/pets">
          <img src="/images/paw.svg" alt="" />
          <div>
            <h2>My Pets</h2>
            <p>See every pet you have created in this local demo.</p>
          </div>
        </Link>
      </div>

      <div className="profile-summary">
        <article className="summary-card">
          <p className="summary-card__label">Logged in as</p>
          <strong>{currentUser?.username}</strong>
          <span>{currentUser?.email}</span>
        </article>
        <article className="summary-card">
          <p className="summary-card__label">Pets in storage</p>
          <strong>{userPets.length}</strong>
          <span>Your private pet list on this device.</span>
        </article>
      </div>

      {recentPets.length ? (
        <section className="profile-preview">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest pets</p>
              <h2>Your recent pet profiles</h2>
            </div>
            <Link className="button button--secondary" to="/pets">
              View All Pets
            </Link>
          </div>

          <div className="pet-grid">
            {recentPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}

export default ProfilePage;

import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import PetCard from '../components/PetCard.jsx';
import useAppContext from '../context/useAppContext.js';

function MyPetsPage() {
  const { userPets } = useAppContext();

  if (!userPets.length) {
    return (
      <EmptyState
        title="Your pet list is empty"
        text="Add your first pet to start testing the local CRUD flow."
        actionLabel="Add Your First Pet"
        actionTo="/pets/new"
      />
    );
  }

  return (
    <section className="pets-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">My Pets</p>
          <h1>All your pet profiles</h1>
        </div>
        <Link className="button button--primary" to="/pets/new">
          Add Another Pet
        </Link>
      </div>

      <div className="pet-grid">
        {userPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </section>
  );
}

export default MyPetsPage;

import { Link, useNavigate, useParams } from 'react-router-dom';
import PetForm from '../components/PetForm.jsx';
import useAppContext from '../context/useAppContext.js';

function EditPetPage() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { getPetById, updatePet } = useAppContext();
  const pet = getPetById(petId);

  if (!pet) {
    return (
      <section className="info-card-page">
        <div className="info-card">
          <h1>Pet not found</h1>
          <p>This pet does not exist in your local demo anymore.</p>
          <Link className="button button--primary" to="/pets">
            Back to My Pets
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (petData) => {
    updatePet(petId, petData);
    navigate(`/pets/${petId}`);
  };

  return (
    <PetForm
      key={pet.id}
      initialPet={pet}
      heading={`Update ${pet.petname}`}
      submitLabel="Update Pet"
      onSubmit={handleSubmit}
    />
  );
}

export default EditPetPage;

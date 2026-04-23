import { Link, useNavigate, useParams } from "react-router-dom";
import useAppContext from "../context/useAppContext.js";
import { formatDisplayDate } from "../utils/date.js";

function PetDetailsPage() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { deletePet, getPetById } = useAppContext();
  const pet = getPetById(petId);

  if (!pet) {
    return (
      <section className="info-card-page">
        <div className="info-card">
          <h1>Pet not found</h1>
          <p>This profile is no longer available in local storage.</p>
          <Link className="button button--primary" to="/pets">
            Back to My Pets
          </Link>
        </div>
      </section>
    );
  }

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Delete ${pet.petname} from your pet list?`,
    );

    if (!shouldDelete) {
      return;
    }

    deletePet(pet.id);
    navigate("/pets");
  };

  return (
    <section className="pet-details-page">
      <article className="pet-details-card">
        <div className="pet-details-card__media">
          <img src={pet.petpicture || ""} alt={pet.petname} />
        </div>

        <div className="pet-details-card__content">
          <p className="eyebrow">Pet Details</p>
          <h1>{pet.petname}</h1>

          <dl className="pet-details-list">
            <div>
              <dt>Sort</dt>
              <dd>{pet.petsort}</dd>
            </div>
            <div>
              <dt>Breed</dt>
              <dd>{pet.petbreed}</dd>
            </div>
            <div>
              <dt>Birthday</dt>
              <dd>{formatDisplayDate(pet.petbirth)}</dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>{pet.petgender}</dd>
            </div>
            <div>
              <dt>Color</dt>
              <dd>{pet.petcolor}</dd>
            </div>
            <div>
              <dt>Hair</dt>
              <dd>{pet.pethair}</dd>
            </div>
            <div>
              <dt>Vaccine</dt>
              <dd>{pet.petvaccines || "Not set yet"}</dd>
            </div>
            <div>
              <dt>Vaccine date</dt>
              <dd>{formatDisplayDate(pet.petvaccinesdate)}</dd>
            </div>
          </dl>

          <div className="pet-details-card__actions">
            <Link className="button button--secondary" to="/pets">
              Back to My Pets
            </Link>
            <Link
              className="button button--primary"
              to={`/pets/${pet.id}/edit`}
            >
              Edit Pet
            </Link>
            <button
              className="button button--danger"
              type="button"
              onClick={handleDelete}
            >
              Delete Pet
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default PetDetailsPage;

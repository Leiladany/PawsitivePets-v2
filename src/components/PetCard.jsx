import { Link } from "react-router-dom";
import { formatDisplayDate } from "../utils/date.js";

function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <div className="pet-card__image-wrap">
        <img
          className="pet-card__image"
          src={pet.petpicture || ""}
          alt={pet.petname}
        />
      </div>

      <div className="pet-card__content">
        <h2>My name is {pet.petname}</h2>
        <p>I&apos;m a {pet.petsort}.</p>
        <p>Breed: {pet.petbreed}</p>
        <p>Birthday: {formatDisplayDate(pet.petbirth)}</p>
        <p>Gender: {pet.petgender}</p>
        <p>Hair type: {pet.pethair}</p>
        <p>Next vaccine: {pet.petvaccines || "Not set yet"}</p>

        <div className="pet-card__actions">
          <Link
            className="button button--primary button--tiny"
            to={`/pets/${pet.id}`}
          >
            Pet details
          </Link>
          <Link
            className="button button--primary button--tiny"
            to={`/pets/${pet.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PetCard;

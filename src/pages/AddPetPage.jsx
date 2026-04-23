import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm.jsx';
import useAppContext from '../context/useAppContext.js';

function AddPetPage() {
  const navigate = useNavigate();
  const { addPet } = useAppContext();

  const handleSubmit = async (petData) => {
    const pet = addPet(petData);
    navigate(`/pets/${pet.id}`);
  };

  return (
    <PetForm
      key="new-pet"
      heading="Add a new pet"
      submitLabel="Add Pet"
      onSubmit={handleSubmit}
    />
  );
}

export default AddPetPage;

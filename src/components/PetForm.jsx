import { useState } from "react";
import { Link } from "react-router-dom";
import { fileToDataUrl } from "../utils/file.js";
import {
  createPetFormValues,
  normalizePetPayload,
  PET_GENDERS,
  PET_HAIR_TYPES,
  PET_TYPES,
} from "../utils/pets.js";

function PetForm({ initialPet, heading, submitLabel, onSubmit }) {
  const [formValues, setFormValues] = useState(() =>
    createPetFormValues(initialPet),
  );
  const [imagePreview, setImagePreview] = useState(
    initialPet?.petpicture || "",
  );
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setImagePreview(dataUrl);
      setFeedback("");
    } catch (error) {
      setFeedback(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      await onSubmit(normalizePetPayload(formValues, imagePreview));
    } catch (error) {
      setFeedback(
        error.message || "Something went wrong while saving this pet.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pet-editor">
      <div className="pet-editor__panel">
        <div className="pet-editor__intro">
          <p className="eyebrow">Pet profile</p>
          <h1>{heading}</h1>
          <p>
            This version stores everything inside your browser, so you can test
            the whole flow without any backend.
          </p>
        </div>

        {imagePreview && (
          <div className="pet-editor__preview">
            <img src={imagePreview} alt="Pet preview" />
          </div>
        )}

        <form className="pet-editor__form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Pet Name</span>
            <input
              type="text"
              name="petname"
              value={formValues.petname}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Cat or Doggo?</span>
            <select
              name="petsort"
              value={formValues.petsort}
              onChange={handleChange}
            >
              {PET_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Breed</span>
            <input
              type="text"
              name="petbreed"
              value={formValues.petbreed}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Pet birthday</span>
            <input
              type="date"
              name="petbirth"
              value={formValues.petbirth}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Pet gender</span>
            <select
              name="petgender"
              value={formValues.petgender}
              onChange={handleChange}
            >
              {PET_GENDERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Pet color</span>
            <input
              type="text"
              name="petcolor"
              value={formValues.petcolor}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Type of hair</span>
            <select
              name="pethair"
              value={formValues.pethair}
              onChange={handleChange}
            >
              {PET_HAIR_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Pet Vaccine</span>
            <input
              type="text"
              name="petvaccines"
              value={formValues.petvaccines}
              onChange={handleChange}
            />
          </label>

          <label className="form-field">
            <span>Vaccine Date</span>
            <input
              type="date"
              name="petvaccinesdate"
              value={formValues.petvaccinesdate}
              onChange={handleChange}
            />
          </label>

          <label className="form-field form-field--file">
            <span>Image</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {feedback ? (
            <p className="form-feedback form-feedback--error">{feedback}</p>
          ) : null}

          <div className="pet-editor__actions">
            <button
              className="button button--primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
            <Link className="button button--secondary" to="/pets">
              Go back to My Pets
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PetForm;

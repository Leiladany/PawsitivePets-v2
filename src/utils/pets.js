import { toDateInputValue } from "./date.js";

export const PET_TYPES = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Doggo" },
];

export const PET_GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const PET_HAIR_TYPES = [
  { value: "long hair", label: "Long Hair" },
  { value: "medium hair", label: "Medium Hair" },
  { value: "short hair", label: "Short Hair" },
  { value: "no hair", label: "No Hair" },
  { value: "wavy hair", label: "Wavy Hair" },
  { value: "curly hair", label: "Curly Hair" },
];

export function createPetFormValues(pet = {}) {
  return {
    petname: pet.petname || "",
    petsort: pet.petsort || PET_TYPES[0].value,
    petbreed: pet.petbreed || "",
    petbirth: toDateInputValue(pet.petbirth),
    petgender: pet.petgender || PET_GENDERS[0].value,
    petcolor: pet.petcolor || "",
    pethair: pet.pethair || PET_HAIR_TYPES[0].value,
    petvaccines: pet.petvaccines || "",
    petvaccinesdate: toDateInputValue(pet.petvaccinesdate),
  };
}

export function normalizePetPayload(formValues, imagePreview) {
  return {
    petname: formValues.petname.trim(),
    petsort: formValues.petsort,
    petbreed: formValues.petbreed.trim(),
    petbirth: formValues.petbirth,
    petgender: formValues.petgender,
    petcolor: formValues.petcolor.trim(),
    pethair: formValues.pethair,
    petvaccines: formValues.petvaccines.trim(),
    petvaccinesdate: formValues.petvaccinesdate,
    petpicture: imagePreview || "",
  };
}

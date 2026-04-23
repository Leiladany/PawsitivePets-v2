import { useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState.js';
import { AppContext } from './app-context.js';
import { hashText } from '../utils/auth.js';
import { STORAGE_KEYS } from '../utils/storage.js';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

export function AppProvider({ children }) {
  const [users, setUsers] = useLocalStorageState(STORAGE_KEYS.users, []);
  const [pets, setPets] = useLocalStorageState(STORAGE_KEYS.pets, []);
  const [sessionUserId, setSessionUserId] = useLocalStorageState(
    STORAGE_KEYS.session,
    null,
  );

  const currentUserRecord = users.find((user) => user.id === sessionUserId) || null;
  const currentUser = sanitizeUser(currentUserRecord);
  const userPets = currentUser
    ? pets
        .filter((pet) => pet.ownerId === currentUser.id)
        .sort((firstPet, secondPet) => {
          const secondDate = new Date(secondPet.updatedAt || secondPet.createdAt);
          const firstDate = new Date(firstPet.updatedAt || firstPet.createdAt);
          return secondDate - firstDate;
        })
    : [];

  useEffect(() => {
    if (sessionUserId && !currentUserRecord) {
      setSessionUserId(null);
    }
  }, [currentUserRecord, sessionUserId, setSessionUserId]);

  const signup = async ({ username, email, password }) => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedUsername || !trimmedEmail || !password) {
      throw new Error('Please fill in username, email, and password.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const usernameTaken = users.some(
      (user) => user.username.toLowerCase() === trimmedUsername.toLowerCase(),
    );
    const emailTaken = users.some((user) => user.email === trimmedEmail);

    if (usernameTaken) {
      throw new Error('That username is already in use.');
    }

    if (emailTaken) {
      throw new Error('That email is already in use.');
    }

    const passwordHash = await hashText(password);
    const newUser = {
      id: generateId(),
      username: trimmedUsername,
      email: trimmedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
    setSessionUserId(newUser.id);

    return sanitizeUser(newUser);
  };

  const login = async ({ username, password }) => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      throw new Error('Please enter both username and password.');
    }

    const matchedUser = users.find(
      (user) => user.username.toLowerCase() === trimmedUsername.toLowerCase(),
    );

    if (!matchedUser) {
      throw new Error('User not found.');
    }

    const passwordHash = await hashText(password);

    if (matchedUser.passwordHash !== passwordHash) {
      throw new Error('Incorrect password.');
    }

    setSessionUserId(matchedUser.id);
    return sanitizeUser(matchedUser);
  };

  const logout = () => {
    setSessionUserId(null);
  };

  const addPet = (petInput) => {
    if (!currentUser) {
      throw new Error('You need to be logged in to add a pet.');
    }

    const timestamp = new Date().toISOString();
    const newPet = {
      ...petInput,
      id: generateId(),
      ownerId: currentUser.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setPets((currentPets) => [newPet, ...currentPets]);
    return newPet;
  };

  const updatePet = (petId, petInput) => {
    if (!currentUser) {
      throw new Error('You need to be logged in to update a pet.');
    }

    let updatedPet = null;

    setPets((currentPets) =>
      currentPets.map((pet) => {
        if (pet.id !== petId) {
          return pet;
        }

        if (pet.ownerId !== currentUser.id) {
          throw new Error('You can only update your own pets.');
        }

        updatedPet = {
          ...pet,
          ...petInput,
          updatedAt: new Date().toISOString(),
        };

        return updatedPet;
      }),
    );

    if (!updatedPet) {
      throw new Error('Pet not found.');
    }

    return updatedPet;
  };

  const deletePet = (petId) => {
    if (!currentUser) {
      throw new Error('You need to be logged in to delete a pet.');
    }

    let removedPet = null;

    setPets((currentPets) =>
      currentPets.filter((pet) => {
        if (pet.id !== petId) {
          return true;
        }

        if (pet.ownerId !== currentUser.id) {
          throw new Error('You can only delete your own pets.');
        }

        removedPet = pet;
        return false;
      }),
    );

    if (!removedPet) {
      throw new Error('Pet not found.');
    }

    return removedPet;
  };

  const getPetById = (petId) => userPets.find((pet) => pet.id === petId) || null;

  const value = {
    currentUser,
    userPets,
    signup,
    login,
    logout,
    addPet,
    updatePet,
    deletePet,
    getPetById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

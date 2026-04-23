import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx';
import { AppProvider } from './context/AppContext.jsx';
import AddPetPage from './pages/AddPetPage.jsx';
import EditPetPage from './pages/EditPetPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyPetsPage from './pages/MyPetsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PetDetailsPage from './pages/PetDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import './styles/app.css';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="signup"
            element={
              <PublicOnlyRoute>
                <SignupPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="pets"
            element={
              <ProtectedRoute>
                <MyPetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="pets/new"
            element={
              <ProtectedRoute>
                <AddPetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="pets/:petId"
            element={
              <ProtectedRoute>
                <PetDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="pets/:petId/edit"
            element={
              <ProtectedRoute>
                <EditPetPage />
              </ProtectedRoute>
            }
          />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DanceStylesPage from './pages/DanceStylesPage';
import DanceDetailsPage from './pages/DanceDetailsPage';
import ClassesPage from './pages/ClassesPage';
import ClassTimingsPage from './pages/ClassTimingsPage';
import WeekendWorkshopsPage from './pages/WeekendWorkshopsPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import GalleryPage from './pages/GalleryPage';
import LocationPage from './pages/LocationPage';
import ContactPage from './pages/ContactPage';
import AdmissionPage from './pages/AdmissionPage';
import FaqPage from './pages/FaqPage';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dance-styles" element={<DanceStylesPage />} />
          <Route path="/dance/:slug" element={<DanceDetailsPage />} />
          <Route path="/class-timings" element={<ClassTimingsPage />} />
          <Route path="/classes-fees" element={<ClassesPage />} />
          <Route path="/weekend-workshops" element={<WeekendWorkshopsPage />} />
          <Route path="/workshops/:slug" element={<WorkshopDetailsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

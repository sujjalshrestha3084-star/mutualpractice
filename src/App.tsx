//src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import QuestionPage from './pages/QuestionsPage';
import NotesPage from './pages/NotesPage';
import PYQsPage from './pages/PYQsPage';
import NewsPage from './pages/NewsPage';
import ProfilePage from './pages/ProfilePage';

import{ AuthProvider,useAuth } from './contexts/AuthContext';
import{DataProvider} from './contexts/DataContext';
import{DNDProvider} from './contexts/DNDContext';
import { Layout } from 'lucide-react';

function AppRoutes(){
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/feed" replace />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/feed" replace />} />
      {}
      { user ?  (
        <Route path="/" element={<Layout/>} >
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/questions" element={<QuestionPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/pyqs" element={<PYQsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DNDProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <AppRoutes />
            </div>
          </Router>
        </DataProvider>
      </DNDProvider>
    </AuthProvider>
  );
}

export default App;

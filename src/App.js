import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from './components/card';
import UserDetail from './components/userDetail';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/UserDetail/:userId" element={<UserDetail />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

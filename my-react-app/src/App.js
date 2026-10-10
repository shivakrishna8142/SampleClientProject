import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Admin from './admin/Admin';
import Dashboard from './Dashboard';
import Form from './Form';
import Manager from './manager/Manager';
import User from './user/User';
import './App.css';
import UserContext from './UserContext';

function App() {
  return (
    <UserContext.Provider value={{ user: { role: 'admin' } }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<main className="App"><Form /></main>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/user" element={<User />} />
        <Route path="/unauthorized" element={<main className="App"><p className="login-description">Unauthorized access</p></main>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;

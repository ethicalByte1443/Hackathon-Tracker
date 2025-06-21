import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Replace with proper auth logic later
  const [email, setEmail] = useState(null); // Replace with proper user state management
  const [username, setUsername] = useState(null); // Optional: Store user name if needed
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} setEmail={setEmail} setUsername={setUsername}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            loggedIn ? <Dashboard email={email} username={username}/> : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

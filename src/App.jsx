import React, { useState } from 'react';
import Login from './components/Login';
import RoomChecker from './components/RoomChecker';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <RoomChecker userName={userName} />;
};

export default App;
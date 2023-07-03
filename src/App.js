import React, { useState } from 'react';
import './App.css';

const Navbar = ({ handleGetUsers }) => {
  return (
    <nav className="navbar">
      <div className="logo">Company Name</div>
      <div className="buttons">
        <button className="get-users-button" onClick={handleGetUsers}>
          Get Users
        </button>
      </div>
    </nav>
  );
};

const UserGrid = ({ users }) => {
  return (
    <div className="user-grid">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img src={user.avatar} alt={user.first_name} />
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

const LoadingScreen = () => {
  return <div className="loading-screen">Loading...</div>;
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar handleGetUsers={handleGetUsers} />
      <div className="content">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          users.length > 0 && <UserGrid users={users} />
        )}
      </div>
    </div>
  );
};

export default App;

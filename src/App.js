import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { Link, Route, Router, Routes } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import MessageApp from './components/MessageApp';
import NavMenu from './components/NavMenu';

import "./styles/mainStyle.css";

function App() {
  const [user, setUser] = useState({});

  function userLoggedIn(userData) {
    setUser(userData);
  }

  useEffect(() => {
    function insideUseEffect() {
      fetch("http://localhost:8000/test", {
        method: "GET",
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseData => {
          console.log(responseData.message);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    insideUseEffect();
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<NavMenu />} />
        <Route path='/user'>
          <Route path='/user/login' element={<Login onLogIn={userLoggedIn} />} />
          <Route path='/user/signUp' element={<SignUp />} />
        </Route>
        <Route path='/messages' element={<MessageApp user={user} />} />
      </Routes>

      <div>

      </div>
    </div>
  );
}

export default App;

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

  return (
    <div className='page-div'>
      <Routes>
        <Route path='/' element={<NavMenu />} />
        <Route path='/user'>
          <Route path='/user/login' element={<Login onLogIn={userLoggedIn} />} />
          <Route path='/user/signUp' element={<SignUp />} />
        </Route>
        <Route path='/messages' element={<MessageApp user={user} />} />
      </Routes>
    </div>
  );
}

export default App;

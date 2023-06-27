import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link , Route , Routes} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Profile from './Components/Profile';
import BoardAdmin from './Components/BoardAdmin';
import BoardModerator from './Components/BoardModerator';
import BoardUser from './Components/BoardUser';
import * as AuthService from "./services/driverAuth.service";
import IDriver from './types/driver.type';
import Inscription from './Components/inscription';
import { FaSignInAlt , FaSignOutAlt , FaPersonBooth , FaHome , FaUserAlt , FaSave   } from 'react-icons/fa';



const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IDriver | undefined>(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    
    
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top  ">
        <Link to={"/"} className="navbar-brand">
          Moto Taxi
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link to={"/home"} className="nav-link focus ">
              <FaHome/>  Home
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item ">
              <Link to={"/mod"} className="nav-link focus ">
                <FaPersonBooth/>  Moderator Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item ">
              <Link to={"/admin"} className="nav-link focus ">
                 <FaPersonBooth/>  Admin Board
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item ">
              <Link to={"/user"} className="nav-link focus ">
                 <FaPersonBooth/> User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link to={"/profile"} className="nav-link  focus">
                     <FaUserAlt/>  {currentUser.drivername}
              </Link>
            </li>
            <li className="nav-item ">
              <a href="/login" className="nav-link focus " onClick={logOut}>
                 <FaSignOutAlt />  Deconnexion
              </a>
            </li>
          </div>
         ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link to={"/login"} className="nav-link focus ">
                  <FaSignInAlt /> Se connecter
              </Link>
            </li>
            <li className="nav-item ">
              <Link to={"/inscription"} className="nav-link focus ">
                    <FaSave /> S'inscrire
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route  path="/" element= {<Home/>}/>
          <Route  path="/home" element= {<Home/>}/>
          <Route  path="/login" element= {<Login/>}/>
          <Route  path="/inscription" element= {<Inscription/>}/>
          <Route  path="/register" element= {<Register/>}/>
          <Route  path="/profile" element= {<Profile/>}/>
          <Route  path="/user" element= {<BoardUser/>}/>
          <Route  path="/mod" element= {<BoardModerator/>}/>
          <Route  path="/admin" element= {<BoardAdmin/>}/>
        </Routes>
      </div>
    </div>
  );
}
export default App;

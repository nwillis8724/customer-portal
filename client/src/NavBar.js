import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import NavbarImage from './images/Alumaview.jpg';
import { UserContext } from './contexts/UserContext';


function NavBar() {
  const {user, setUser} = useContext(UserContext)

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => {
        if (r.ok) {
          setUser();
          console.log('Logout successful');
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('An error occurred during the logout process:', error);
      });
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          {user ? null : <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>
          </li>}
          {user ? <li className="nav-item">
            <NavLink to="/myjobs" className="nav-link">My Jobs</NavLink>
          </li> : null}
          {user ? <li className="nav-item">
            <NavLink to="/adddoor" className="nav-link">Add Door</NavLink>
          </li> : null}
          {user ? <li className="nav-item">
            <NavLink to="/addemployee" className="nav-link">Add Employee</NavLink>
          </li> : null}
          <li className="nav-item login">
           {user ? <NavLink to="/" className="nav-link" onClick={handleLogout} >Logout</NavLink> : <NavLink to="/login" className="nav-link">Login</NavLink>}
          </li>
        </ul>
      </div>
      <img className="navbar-image" src={NavbarImage} alt="Navbar Image" />
    </nav>
  );
}

export default NavBar;
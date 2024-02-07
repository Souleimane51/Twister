// Library
import React from 'react';
import classes from './Navbar.module.css';
import routes from '../../config/routes';

// Component
import logo from '../../assets/Logo.png'
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import ProfilePill from './ProfilePill/ProfilePill';


function Navbar() {
  return (
    <header className={classes.Navbar}>
        <div className={classes.container}>
          <Link to={routes.Home}>
            <img className={classes.logo} src={logo} alt="Twister's logo" />
          </Link>
          <Navigation />
          <ProfilePill />
        </div>

    </header>
  )
}

export default Navbar
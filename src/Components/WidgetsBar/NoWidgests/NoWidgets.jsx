// Libraries
import React from 'react';
import classes from './NoWidgets.module.css';

// Component
import logo from '../../../assets/Logo.png';

function NoWidgets() {
  return (
    <div className={classes.NoWidgets}>
            <img src={logo} alt="Twister's logo" className={classes.logo}/>
            <div className={classes.text}>No interesting Widgets on this page...</div> 
            
    </div>
  )
}

export default NoWidgets;
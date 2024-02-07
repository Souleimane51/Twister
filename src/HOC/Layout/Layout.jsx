// Libraries
import React from 'react';
import classes from './Layout.module.css';
import { useNavigate } from 'react-router-dom';

// Component
import Navbar from '../../Components/NavBar/Navbar';
import WidgetsBar from '../../Components/WidgetsBar/WidgetsBar';
import { BsArrowLeftShort } from 'react-icons/bs'
import NewTwistPopup from '../../Components/NewTwistPopup/NewTwistPopup';


function Layout({pageName, goBackOption, children, widgets}) {

  const navigate = useNavigate();

  return (
    <div className={classes.Layout}>
        <Navbar />
        <div className={classes.children}>
          <div className={classes.pageNameContainer}>
            {goBackOption && <div className={classes.arrowContainer} onClick={() => navigate(-1)}>
               <BsArrowLeftShort className={classes.arrow} />
            </div>}
            
            <h1>{pageName}</h1>
          </div>

          {children}
          
        </div>
        <WidgetsBar widgets={widgets}/>
        <NewTwistPopup/>
    </div>
  )
}

export default Layout
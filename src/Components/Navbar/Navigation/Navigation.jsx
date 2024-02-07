// Libraries
import React, { useState, useEffect, useContext } from 'react';
import classes from './Navigation.module.css';
import { useLocation } from 'react-router-dom';
import routes from '../../../config/routes';
import { ShowPopupContext } from '../../../context/showPopupContext';

// ComponentS
import { NavLink } from 'react-router-dom';
import Button from '../../UI/Button/Button'

// Icons
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';;
import { HiMagnifyingGlass, HiOutlinePencil, HiPencil } from 'react-icons/hi2';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BsPeople, BsPeopleFill, BsPerson, BsFillPersonFill } from 'react-icons/bs';
import { LiaFeatherAltSolid } from 'react-icons/lia'

function Navigation() {

    // State
    const [activeLink, setActiveLink] = useState('home');

    // Context
    const { setShowPopup }= useContext(ShowPopupContext);

    // Location
    const location = useLocation();



    useEffect(() => {
        if (location.pathname === '/') {
            setActiveLink('/home');
        } else {
            setActiveLink(location.pathname);
        }

    }, [location.pathname])
    


    return (
        
        //! Sorry for the Don't Repeat Yourself rule 😅

        <nav className={classes.Navigation}>
            <ul className={classes.navContainer}>
 
                <li>
                    {/* Give active classe to our the link if the state is equal the home */}
                    <NavLink className={`${classes.link} ${activeLink === '/home' ? classes.active : ''}`} to={routes.Home} end >
                        {activeLink === '/home' ? <AiFillHome className={classes.icon}/> : <AiOutlineHome className={classes.icon}/>}
                        <span className={classes.linkText}> Home </span>
                    </NavLink> 
                </li>

                <li>
                    <NavLink className={`${classes.link} ${activeLink === '/explore' ? classes.active : ''}`} to={routes.Explore} end >
                        {activeLink === '/explore' ? <FaMagnifyingGlass className={classes.icon}/> : <HiMagnifyingGlass className={classes.icon} />}
                        <span className={classes.linkText}> Explore </span>
                    </NavLink>
                </li>

                <li> 
                    <NavLink className={`${classes.link} ${activeLink === '/community' ? classes.active : ''}`} to={routes.Community} end >
                        {activeLink === '/community' ? <BsPeopleFill className={classes.icon}/> : <BsPeople className={classes.icon}/> }
                        <span className={classes.linkText}> Commutity </span>
                    </NavLink>
                </li>
                
                <li> 
                    <NavLink className={`${classes.link} ${activeLink === '/profile' || activeLink === '/profile/mytwists' || activeLink === '/profile/myretwists' || activeLink === '/profile/mydrafts' ? classes.active : ''}`} to={routes.Profile} end>
                        {activeLink === '/profile' || activeLink === '/profile/mytwists' || activeLink === '/profile/myretwists' || activeLink === '/profile/mydrafts' ? <BsFillPersonFill className={classes.icon}/> : <BsPerson className={classes.icon}/>}
                        <span className={classes.linkText}> Profile </span>
                    </NavLink>
                </li>

                <li>    
                    <NavLink className={`${classes.link} ${activeLink === '/drafts'  ? classes.active : ''}`} to={routes.Home} >
                        {activeLink === '/drafts' ? <HiPencil className={classes.icon}/> : <HiOutlinePencil className={classes.icon}/>} 
                        <span className={classes.linkText}> Drafts </span>
                    </NavLink>
                </li>
                <li>
                    <div className={classes.button} onClick={() => setShowPopup(true)}>
                       <Button designType={'Button_twist'}>Twist</Button> 
                    </div> 
                    <div className={classes.featherContainer}><LiaFeatherAltSolid className={classes.feather}/></div>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
// Libraries
import React from 'react';
import classes from './SubNavItem.module.css'
import routes from '../../../config/routes';

// Components
import { Link, useLocation } from "react-router-dom";

function SubNavItem({path, children}) {

    const location = useLocation();

    return (
        <Link 
            to={ routes.Profile + path }
            className={`${classes.SubNavItem} ${location.pathname === routes.Profile + path ? classes.active : ""}`}
        >{children}</Link>
    );
}

export default SubNavItem;
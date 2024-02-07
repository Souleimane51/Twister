//  Libraries
import React from 'react';
import routes from '../../config/routes';
import classes from './SubNav.module.css';


// Components
import SubNavItem from './SubNavItem/SubNavItem';


function SubNav() {
   
    return (
        <div className={classes.SubNav}>
            <SubNavItem path={""}>My Twists</SubNavItem>
            <SubNavItem path={"/myretwists"}>My Retwists</SubNavItem>
            <SubNavItem path={"/mydrafts"}>My Drafts</SubNavItem>
        </div>
        
    )
}

export default SubNav;
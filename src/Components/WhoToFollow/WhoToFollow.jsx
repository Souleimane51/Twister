// Libraries
import React, { useEffect, useState, useContext } from 'react';
import classes from './WhoToFollow.module.css';
import axios from '../../config/axiosFirebase';
import firstLettersName from '../../shared/firstLettersName';
import { UserContext } from '../../context/userContext';

// Component
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';
import { BsArrowRightShort } from 'react-icons/bs';
import Loader from '../UI/Loader/Loader';

function WhoToFollow({IsWidget}) {

  // Context
  const { user, users, handleFollow } = useContext(UserContext);


  // Put each user as an object in the 'usersArray' array to be able to map them
  const usersArray = [];
  for (const key in users) {
    // put user only if his email address is different of the current one
    if(user && user.email !== users[key].email) {
      usersArray.push({
        id: key,
        ...users[key]
      });
    }
  }



  // Keep only the 5 last users by the more recent one
  const remainingUsers = usersArray.reverse().slice(0, 5);
  

  // Create a card for each of the 5 users with full name, username and follow button
  const usersWidgets = users ? (
    remainingUsers.map(individualUser => {

      const isFollowing = user.following && user.following.includes( individualUser.id );

      return (
        <div className={classes.mainContainer}  key={individualUser.id}>
          <div className={classes.subContainer}>
              <div className={classes.profilePicture}>{!individualUser.linkToProfilee ? firstLettersName(individualUser.fullName) : <img src={individualUser.linkToProfilee} alt="Profile picture" />}</div>
              <div className={classes.container}>
              <div className={classes.fullName}>{individualUser.fullName}</div>
              <p className={classes.username}>{individualUser.username}</p>
            </div>
          </div>
        
          <div className={classes.button} onClick={() => handleFollow(individualUser.id)}>
            <Button designType={isFollowing ? 'Button_red_mini' : 'Button_dark_mini' }>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
          </div>

        </div>
      )
    })
  ) : ( <Loader /> );

  return (
    <div className={classes.WhoToFollow}>
      <div className={classes.widgetsTitle}>
        <h2 >How to follow</h2>
      </div>
      { usersWidgets }
      <Link to={routes.Community} className={classes.linkContainer}>
        <span className={classes.text}>See more</span>
        <BsArrowRightShort className={classes.arrow}/>
      </Link>
      
    </div>
  )
};

export default WhoToFollow;
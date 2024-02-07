// Libraries
import React, { useState, useEffect, useContext } from 'react';
import classes from './PrevUserInfo.module.css';
import { UserContext } from '../../context/userContext';

// Component
import Button from '../UI/Button/Button';
import firstLettersName from '../../shared/firstLettersName';
import { PiDotBold } from 'react-icons/pi';


function PrevUserInfo({individualUser, communityPage}) {

    const { user, handleFollow } = useContext(UserContext);

    const [isFollowing, setIsFollowing] = useState("");


    useEffect(() => {
        if (user.following.includes(individualUser.id)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }

    }, [user.following])

    return (
        <div className={`${!communityPage ? classes.prevUserInfo : classes.prevUserInfoCommunity}`}>
            {/* User info visible on top of the individualUser */}
            <div className={classes.subContainer}>
                <div className={classes.profilePicture}>{!individualUser.linkToProfile ? firstLettersName(individualUser.fullName) : <img src={individualUser.linkToProfile} alt="Profile's picture" />}</div>
                
                {!communityPage ? <div className={classes.userInfoContainer}>
                    <h4 className={classes.nameFull}>{individualUser.fullName}</h4>
                    <p className={classes.username}>{individualUser.username}</p>
                </div> 
                : 
                <div className={classes.userInfoContainer}>
                    <div className={classes.userInfoSubContainer}>
                        <h4 className={classes.nameFull}>{individualUser.fullName}</h4>
                        <PiDotBold className={classes.dot} />
                        <p className={classes.username}>{individualUser.username}</p>   
                    </div>
                    {communityPage && <p className={classes.followers}>{individualUser.followers.length + ' Followers'}</p>}
                </div>}
            </div>
            {/* <div onClick={() => followButtonClickedHandler(currentindividualUserSelected.authorId)}> */}
            <div className={classes.button} onClick={() => handleFollow(individualUser.id || individualUser.authorId)}>
                <Button designType={isFollowing ? 'Button_red_mini' : 'Button_dark_mini' }>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
            </div>
        </div>
    )
}

export default PrevUserInfo
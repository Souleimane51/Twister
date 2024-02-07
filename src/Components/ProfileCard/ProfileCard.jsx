// Libearies
import React, { useState, useContext } from 'react';
import classes from './ProfileCard.module.css';
import date from '../../shared/dateManager';
import { UserContext } from '../../context/userContext';

// Components
import firstLettersName from '../../shared/firstLettersName';
import Button from '../../Components/UI/Button/Button';
import EditProfilePopUp from './EditProdilePopUp/EditProfilePopUp';


// Icons
import { SlLocationPin } from "react-icons/sl";
import { IoIosLink } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

function ProfileCard({user, setUser, personalProfile}) {

    // State
    const [showModal, setShowModal] = useState(false);

    // Contexte
    const { handleLike } = useContext(UserContext);

    
    return  (
        <div className={classes.topContainer}>
            {!user.linkToBg ? <div className={classes.banner}></div> : <img src={user.linkToBg} alt="Banner Picture" />}
            <div className={classes.profilePictureContainer}>
                {!user.linkToProfile ? <p className={classes.firstLetterName}>{firstLettersName(user.fullName)}</p> : <img src={user.linkToProfile} alt="Profile Picture" />}
            </div>
            <div className={`${personalProfile ? classes.buttonContainerPersonal : classes.buttonContainerPublic}`} onClick={personalProfile ? () => setShowModal(true) : handleLike(user.id)}>
                {personalProfile ? <Button designType={'Button_light_medium'}>Edit profile</Button> : <Button designType={'Button_red_medium'}> Follow </Button>}
            </div>
            
            <div className={classes.middleContainer}>
                <div className={classes.middleSubContainer}>
                    <h2 className={classes.fullName}>{user.fullName}</h2>
                    <h3 className={classes.username}>{user.username}</h3>
                    <p className={classes.desc}>{user.bio}</p>
                    <div className={classes.about}>

                        { user.location && <div className={classes.location}>
                            <SlLocationPin className={classes.icon}/>
                            <p className={classes.aboutContent}>{user.location}</p>
                        </div>}

                        {user.website && <div className={classes.website}>
                            <IoIosLink className={classes.icon}/>
                            <a href={user.website} className={classes.aboutContent} target="_blank">{user.website}</a>
                        </div>}

                        {user.joinDate && <div className={classes.joinDate}>
                            <IoCalendarOutline className={classes.icon}/>
                            <p className={classes.aboutContent}>{'Joined ' + date(user.joinDate)}</p>
                        </div>}

                    </div>
                    <div className={classes.popularity}>
                        <p className={classes.followers}><b>{user.followers.length}</b> Followers</p>
                        <p className={classes.following}><b>{user.following.length}</b> Following</p>
                    </div> 
                </div>

            </div>
            <EditProfilePopUp
                user={user}
                showModal={showModal}
                setShowModal={() => setShowModal()}
            />
        </div>
    )
}

export default ProfileCard;
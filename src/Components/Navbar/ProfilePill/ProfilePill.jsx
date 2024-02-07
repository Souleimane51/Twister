// Libraries
import React, { useContext, useState } from 'react';
import classes from './ProfilePill.module.css';

// Components
import { UserContext } from '../../../context/userContext';
import LogoutModal from './LogoutModal/LogoutModal';
import firstLettersName from '../../../shared/firstLettersName';

// Component (icons)
import { BiSolidLock } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import Loader from '../../UI/Loader/Loader';



function ProfilePill() {

    // Hooks

    // State
    const [logoutHidden, setLogoutHidden] = useState(true);
    const [ShowModal, setShowModal] = useState(false)

    // Context (consumer side)
    const { user } = useContext(UserContext);



    // Function
    const logoutButtonClickedHandler = () => {
        setLogoutHidden(true);
        if (!logoutHidden) {
            setShowModal(true);
        }
    }

    return user ? (
        <div className={classes.ProfilePill}>
            <div className={`${classes.logout} ${!logoutHidden ? classes.active : ""}`}>
                <div>
                    <button className={classes.button} onClick={logoutButtonClickedHandler}>Log out</button> 
                </div>
            </div>

            <div className={classes.mainContainer} onClick={() => setLogoutHidden(!logoutHidden)}>
                <div className={classes.profilePicture}>{!user.linkToProfile ? firstLettersName(user.fullName) : <img src={user.linkToProfile} alt="Profile's picture" />}</div>

                <div className={classes.container}>
                    <div className={classes.subContainer}>
                        <div className={classes.fullName}>{user.fullName}</div> 
                        <BiSolidLock className={classes.iconLock}/>
                    </div>
                    <div className={classes.username}>{user.username}</div>
                    
                </div>
                <BsThreeDots className={classes.iconThreeDots}/>
            </div>
            { ShowModal && <LogoutModal showModal={setShowModal}/>}
        </div>
   
    )
    :
    (
        <div>
            <Loader/>
        </div>
    )
}

export default ProfilePill;
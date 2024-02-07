// Libraries
import React from 'react'
import classes from './LogoutModal.module.css'
import { app } from '../../../../config/firebase';
import routes from '../../../../config/routes';
import { useNavigate } from 'react-router-dom';

// Component
import { toast } from 'react-toastify';
import logo from '../../../../assets/Logo.png';
import Button from '../../../UI/Button/Button';



function LogoutModal({ showModal }) {

    // Navigate
    const navigate = useNavigate();

    // Function to log out user
    const logoutButtonClickedHandler = () => {
        app.auth().signOut()
            .then(() => {
                navigate(routes.Login),
                toast.success('You are now logged out')
            });
    }

    return (
    <div className={classes.LogoutModal}>
        <div className={classes.container} >

            <div className={classes.modalBody}>
                <img className={classes.logo} src={logo} alt="Twister's logo"/>
                <h3 className={classes.title}>Log out of Twister ?</h3>
            </div>

            <div className={classes.button} onClick={logoutButtonClickedHandler}>
                <Button designType={'Button_dark'}>Log Out</Button> 
            </div>
            <div className={classes.button} onClick={() => showModal(false)}>
                <Button designType={'Button_light'}>Cancel</Button>
            </div>

        </div>
        <div className={classes.modalBackground} onClick={() => showModal(false)}></div>
    </div>
    )
}

export default LogoutModal
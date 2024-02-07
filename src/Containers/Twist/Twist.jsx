// Libraries
import React, { useContext, useEffect, useRef } from 'react';
import classes from './Twist.module.css';
import { useParams } from 'react-router-dom';
import date from '../../shared/dateManager';
import axios from '../../config/axiosFirebase';
import routes from '../../config/routes';
import { UserContext } from '../../context/userContext';
import { TwistContext } from '../../context/twistContext';

// Components
import Layout from '../../HOC/Layout/Layout'
import firstLettersName from '../../shared/firstLettersName';
import Loader from '../../Components/UI/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../Components/UI/Button/Button';
import AddComment from './AddComment/AddComment';
import Comments from './Comments/Comments.jsx';
import OptionsBar from '../../Components/OptionsBar/OptionsBar';
import TwistCard from '../../Components/TwistCard/TwistCard';




function Twist() {


    // hooks
    const { id } = useParams();  

    // UseNavigate
    const navigate = useNavigate();


    // Context
    const { user, handleFollow } = useContext(UserContext);
    const { twists, currentTwistSelected, setCurrentTwistSelected, commentInput } = useContext(TwistContext);


    // UseEffect 
    useEffect(() => {
        if (!user) {
          navigate(routes.Login)
        }
      }, [user])

    useEffect(() => {   
        const updateTwistSelected =  () => {
           for (const key in twists) {
            if (twists[key].twistId == id) {
                setCurrentTwistSelected(twists[key])
                console.log('TWIST SELECTED == ',currentTwistSelected )
            }
          } 
        }
        updateTwistSelected();
   
    }, [twists]);
    

    return  (
        <Layout widgets={true} pageName={'Twist'} goBackOption={true}>
            { currentTwistSelected && currentTwistSelected.length !== 0 ? 
                <div className={classes.twistPreview}>

                    <TwistCard 
                        twist={currentTwistSelected}
                        user={user}
                    />
                    
                    <AddComment 
                        twistId={currentTwistSelected.firebasetwistId}
                        commentInput={commentInput}
                    />

                    <Comments/>
                    
                </div>
            :

            // If there is no twists we display the loader
                <div className={classes.loaderContainer}>
                    <Loader/>
                </div>
            }
        </Layout>
        
    )
};

export default Twist;
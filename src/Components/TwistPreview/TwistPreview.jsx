// Libraries
import React, { useContext, useEffect, useState } from 'react';
import classes from './TwistPreview.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; 
import { TwistContext } from '../../context/twistContext';

// Components
import Loader from '../UI/Loader/Loader';
import TwistCard from '../TwistCard/TwistCard';




function TwistPreview() {

    // hooks:

    // State
    const [filteredTwists, setFilteredTwists] = useState();

    // Context
    const { user } = useContext(UserContext);
    const { twists, commentInput } = useContext(TwistContext);

    // Useeffect
    useEffect(() => {
        if (twists && user) {
            const result = twists.filter((twist) => twist.authorId != user.id);
            setFilteredTwists(result);
        }
        
    }, [twists]);


    let twistPreview = filteredTwists ? (
        filteredTwists.map(twist => (

            <div className={classes.container} key={twist.twistId} >

                <TwistCard 
                    twist={twist}
                    user={user}
                    commentInput={commentInput}
                    preview={true}
                />

            </div>
        ))
    ) 
    : 
    (
        // If there is no twists we display the loader
        <div className={`${classes.container} ${classes.containerLoading}`}>
            <Loader/>
        </div>
    )

    return (
        <>
            {twistPreview}
        </>
    );
};

export default TwistPreview;
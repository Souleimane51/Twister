// Libraries
import React, {useContext, useState, useEffect} from 'react';
import classes from './MyDrafts.module.css'
import { TwistContext } from '../../context/twistContext';
import { UserContext } from '../../context/userContext';


// Components
import TwistCard from '../TwistCard/TwistCard';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

function MyDrafts() {

    const [currentUserRetwists, setCurrentUserRetwists] = useState("")

    const { twists } = useContext(TwistContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate(routes.Login)
        }
    }, [user])

    useEffect(() => {
        const currentUserRetwistsArray = [];
        if (twists && user) {
            for (const key in twists) {
                if (twists[key].authorId === user.id && twists[key].state === "Drafts (only You)") {
                    currentUserRetwistsArray.push({...twists[key]})
                }
            }
            console.log();
            setCurrentUserRetwists(currentUserRetwistsArray);
        }
    }, [twists])


    let twistPreview = currentUserRetwists && (
        currentUserRetwists.map(twist => (

            <div className={classes.container} key={twist.twistId} >

                <TwistCard 
                    twist={twist}
                    user={user}
                    commentInput={false}
                    preview={true}
                />

            </div>
        ))
    )


    return (
        <>
            {twistPreview}
        </>
        
    )
}

export default MyDrafts;
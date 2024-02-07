// Libraries
import React, {useContext, useState, useEffect} from 'react';
import classes from './MyTwists.module.css'
import { TwistContext } from '../../context/twistContext';
import { UserContext } from '../../context/userContext';


// Components
import TwistCard from '../TwistCard/TwistCard';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

function MyTwists() {

    const [currentUserTwists, setCurrentUserTwists] = useState("")

    const { twists, deleteTwist } = useContext(TwistContext);
    const { user } = useContext(UserContext);

    const {navigate} = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate(routes.Login)
        }
      }, [user])

    useEffect(() => {
        const currentUserTwistsArray = [];
        if (twists && user) {
            for (const key in twists) {
                if (twists[key].authorId === user.id && twists[key].state === "Everyone" && twists[key].retwistFrom === "") {
                    currentUserTwistsArray.push({...twists[key]})
                }
            }
            setCurrentUserTwists(currentUserTwistsArray);
        }
    }, [twists])

    let twistPreview = currentUserTwists && (
        currentUserTwists.map(twist => (

            <div className={classes.container} key={twist.twistId} >

                <TwistCard 
                    twist={twist}
                    user={user}
                    commentInput={false}
                    preview={true}
                    toDel={true}
                    deleteTwist={() => deleteTwist(twist)}
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

export default MyTwists;
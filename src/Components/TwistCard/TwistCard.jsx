// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './TwistCard.module.css';
import { UserContext } from '../../context/userContext';

// Component
import PrevUserInfo from '../PrevUserInfo/PrevUserInfo';
import firstLettersName from '../../shared/firstLettersName';
import date from '../../shared/dateManager';
import OptionsBar from '../OptionsBar/OptionsBar'

// icons
import { PiDotBold } from 'react-icons/pi';
import { ImCross } from "react-icons/im";




function TwistCard({twist, user, commentInput, preview, toDel, deleteTwist}) {

    const navigate = useNavigate();
    
    const { users } = useContext(UserContext);

    const [twistAuthor, setTwistAuthor] = useState([])


    useEffect(() => {
        console.log("1");
        for (const key in users) {
            console.log("2");
            if (twist.authorId === key) {
                console.log("3");
                setTwistAuthor({
                    id: key,
                    ...users[key]
                })
            }
            else {
                console.log("else");
            }
        }    
    }, [twist])


    

    return twist && twistAuthor && (
        <div className={`${preview ? classes.linkPart : classes.container}`} onClick={() => !preview || toDel ? "" : navigate('/twist/'+ twist.twistId)}>

            { preview ? 
                
                // If it's a twist preview we display the code below
                <div className={classes.userContainerPrev}>
                    {toDel ? <div className={classes.cross} onClick={() => deleteTwist(twist)}><ImCross/></div> : "" }
                    {/* User info visible on top of the twist */}
                    <div className={classes.profilePicturePrev}>{!twistAuthor.linkToProfile ? firstLettersName(twistAuthor.fullName) : <img src={twistAuthor.linkToProfile} alt="Profile picture" />}</div>
                    <div className={classes.userInfoContainerPrev}>

                        <h4 className={classes.namePrev}>{twistAuthor.fullName}</h4>
                        <p className={classes.username}>{twistAuthor.username}</p>
                        <PiDotBold className={classes.dotIcon}/>
                        <p className={classes.date}>{date(twist.postedDate)}</p>

                    </div>
                </div>
                :
                <PrevUserInfo
                    individualUser={twistAuthor}
                    communityPage={false}
                />
            }
        
            {/* Middle section with the retwist info if its a retwist, the content and the bottom line */}
            {twist.retwistFrom  ? <p className={`${preview ? classes.retwistFromPrev : classes.retwistFromFull}`}>Retwist from: <b className={classes.retwistFromBold}>{twist.retwistFrom}</b></p> : null}
            <p className={`${preview ? classes.contentPrev: classes.contentFull}`}>{twist.value}</p>
            {!preview ? <p className={classes.date}>{date(twist.postedDate)}</p> : null}
        
            <span className={classes.line}></span>
            
            <OptionsBar 
                twist={twist}
                authorUsername={twistAuthor.username}
                user={user}
                commentInput={commentInput}
            />

        </div>
    )
}

export default TwistCard;
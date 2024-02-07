// Libraries
import React, { useContext, useRef } from 'react';
import classes from './OptionsBar.module.css';
import { UserContext } from '../../context/userContext';
import { TwistContext } from '../../context/twistContext';

// icons
import { LuMessageCircle } from 'react-icons/lu';
import { RxLoop } from 'react-icons/rx';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function OptionsBar({twist, authorUsername, user, commentInput}) {

    // useContext
    const { handleLike, handleRetwist /*, currentTwistSelected*/ } = useContext(TwistContext);
    // if (!currentTwistSelected) { return null; }
    // const twist = currentTwistSelected;

    // Function
    const objectCounter = value => {
        let count = 0;
        for (const element in value) {
            count = ++count
        }
        return count;
    }

    

    // console.log('LIKES === ', twist.likes.length)

    return (

        

            // Bottom section containes the icons and number of comments, retwists, likes
            <div className={classes.bottomContainer}>

                {/* Comments  */}
                <div className={classes.bottomIconsContainer} title='Comments' onClick={() => commentInput.current.focus()}>

                    <div className={classes.iconComments}>
                        <LuMessageCircle className={`${classes.bottomIcons} ${classes.comments}`}/> 
                    </div>
                    
                    <p className={`${classes.bottomIconsText} ${classes.comments}`}>{objectCounter(twist.comments)}</p> 

                </div>

                {/* Retwists */}
                <div className={classes.bottomIconsContainer} title='Retwist' onClick={() => handleRetwist(twist.value, authorUsername, twist.firebasetwistId, user)}>
                    <div className={classes.iconRetwist}>
                        <RxLoop className={`${classes.bottomIcons} ${classes.retwist} ${user && twist.retwist && twist.retwist.includes( user.id ) ? classes.active : ""}`}/>
                    </div>

                    <p className={`${classes.bottomIconsText} ${classes.retwist} ${user && twist.retwist && twist.retwist.includes( user.id ) ? classes.active : ""}`}>{twist.retwist ? twist.retwist.length : 0}</p>
                </div>


                {/* Likes */}
            <div className={classes.bottomIconsContainer} title='Likes' onClick={() => {
                console.log('===> ', twist.firebasetwistId);
                handleLike(twist.firebasetwistId, user.id)
            }
            }>
                    <div className={classes.iconLikes}>
                    {user && twist.likes && twist.likes.includes( user.id ) ? <AiFillHeart className={`${classes.likes} ${classes.active}`}/> : <AiOutlineHeart className={`${classes.bottomIcons} ${classes.likes}`}/> }
                    </div>
                    <p className={`${classes.bottomIconsText} ${classes.likes} ${twist.likes ? twist.likes.includes(user.id) ? classes.active : "": ""}`}>{Array.isArray(twist.likes) ? twist.likes.length : 0}</p>
                </div>

        </div>

    )
}

export default OptionsBar;
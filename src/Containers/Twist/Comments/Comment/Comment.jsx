// Libraries
import React from 'react';
import classes from './Comment.module.css';
import date from '../../../../shared/dateManager';

// Components
import firstLettersName from '../../../../shared/firstLettersName';
import Loader from '../../../../Components/UI/Loader/Loader';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { PiDotBold } from 'react-icons/pi';


function Comment(props) {


    return props.comment ? (
        <div>
            <div className={classes.main} >

                <div className={classes.container}>
                    <div className={classes.userContainer}>
                        {/* User info visible on top of the twist */}
                        <div className={classes.profilePicture}>{!props.comment.linkToProfile ? firstLettersName(props.comment.fullName) : <img src={props.comment.linkToProfile} alt="Profile's picture" />}</div>
                        <div className={classes.user}>

                            <h4 className={classes.name}>{props.comment.fullName}</h4>
                            <p className={classes.username}>{props.comment.username}</p>
                            <PiDotBold className={classes.dotIcon}/>
                            <p className={classes.date}>{date(props.comment.date)}</p>
                            
                        </div>
                    </div>  
                    <div className={classes.LikesIconContainer} title='Likes' onClick={() => props.handleLikeButtonClicked(props.comment.firebaseCommentId, props.comment.twistId, props.user.id)}>

                        <div className={classes.iconLikes}>
                            {props.user && props.comment.likes.includes( props.user.id ) ? <AiFillHeart className={`${classes.likes} ${classes.active}`}/> : <AiOutlineHeart className={`${classes.bottomIcons} ${classes.likes}`}/> }
                        </div>
                        <p className={`${classes.LikesValue} ${classes.likes} ${props.user && props.comment.likes.includes(props.user.id) ? classes.active : ""}`}>{props.comment.likes.length}</p>
                    
                    </div>
                    
                </div>
                <p className={classes.content}>{props.comment.value}</p>
                
            </div>
        </div>
    )
        : 
    (
        // If there is no twists we display the loader
        <div className={`${classes.container} ${classes.containerLoading}`}>
            <Loader/>
        </div>
    )

}

export default Comment;
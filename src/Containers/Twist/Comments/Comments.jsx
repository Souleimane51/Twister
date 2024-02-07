import React, { useState, useEffect, useContext } from 'react'
import axios from '../../../config/axiosFirebase';
import { UserContext } from '../../../context/userContext';
import { TwistContext } from '../../../context/twistContext';

// Components
import Comment from './Comment/Comment'

function Comments() {

    const { user } = useContext(UserContext);
    const { currentTwistSelected } = useContext(TwistContext);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const commentInfo = [];
  
        for (const key in currentTwistSelected.comments) {
            commentInfo.push({
                firebaseCommentId: key,
                ...currentTwistSelected.comments[key]
            })
        }
        
        setComments(commentInfo);
 
        

    }, [currentTwistSelected])

    // console.log(currentTwistSelected);

    // On click of like button
    const handleLikeButtonClicked = (commentId, twistId, currentUserId) => {

        // Create a copy of the twists
        const commentsCopy = [...comments];

        
        // Get the clicked comment index
        let commentIndex;
        for (const key in comments) {
            if (comments[key].firebaseCommentId === commentId) {
                commentIndex = key;
            }
        } 

        //Get the user index in the comments likes collection
        const userIndexInCommentLikes = comments[commentIndex].likes.indexOf(currentUserId);

        // Add user to the likes only if he is not already
        if (!commentsCopy[commentIndex].likes.includes(user.id)) {
            
            // Add the current user to the likes collection of the state
            commentsCopy[commentIndex].likes = [ currentUserId, ...commentsCopy[commentIndex].likes];
            setComments(commentsCopy);

            
            // Add the current user to the likes collection of firebase
            axios.put('/twists/' + twistId + '/comments/' + commentId + '/likes.json', commentsCopy[commentIndex].likes)

        }

        // If the user is has already liked the twist but he clicked again on the like button (unlikes):
        else {

            // We remove the current user from the clicked twist's likes collection of firebase 
            axios.delete('/twists/' + twistId + '/comments/' + commentId + '/likes/' + userIndexInCommentLikes + '.json')
                .then(() => {

                    // Then to the state
                    commentsCopy[commentIndex].likes.splice(userIndexInCommentLikes, 1);
                    setComments(commentsCopy);

                    // Then if the likes collection is empty we create it back (otherwise it is deleted)
                    if (comments[commentIndex].likes.length === 0) {
                        commentsCopy[commentIndex].likes = "";
                        axios.put('/twists/' + twistId + '/comments/' + commentId + '.json', commentsCopy[commentIndex]) 
                    }

                });
        }
    }

    
    let displayComments = currentTwistSelected.comments && (
        comments.map(comment => (
           <Comment 
                key={comment.firebaseCommentId}
                comment={comment}
                user={user}
                handleLikeButtonClicked={handleLikeButtonClicked}
           />
        ))
    ) 

    return (
        <div>
            { displayComments }
        </div>
    )
}

export default Comments
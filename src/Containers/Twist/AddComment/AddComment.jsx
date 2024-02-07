// Libraries
import React, { useState, useEffect, useContext } from 'react';
import classes from './AddComment.module.css'
import axios from '../../../config/axiosFirebase';
import { UserContext } from '../../../context/userContext';
import { TwistContext } from '../../../context/twistContext';
import firstLettersName from '../../../shared/firstLettersName';

// Component
import Button from '../../../Components/UI/Button/Button'
import Loader from '../../../Components/UI/Loader/Loader';
import { toast } from 'react-toastify';


function AddComment({twistId, commentInput}) {

    // Hooks

    // Context
    const { user } = useContext(UserContext);
    const { currentTwistSelected, setCurrentTwistSelected } = useContext(TwistContext);

    // State
    const [input, setInput] = useState({value: ""})


    // Function

    const handleInputChange = event => {
        const inputCopy = {...input}
        inputCopy.value = event.target.value;
        setInput(inputCopy)
    }

    const handleNewComment = () => {

        const twistsCopy = { ...currentTwistSelected };
        const inputCopy = {...input};
        const commentId = Math.floor(Math.random() * Date.now());

        const comment = {
            id: commentId,
            twistId: twistId,
            authorId: user.id,
            fullName: user.fullName, 
            username: user.username,
            email: user.email,
            linkToProfile: user.linkToProfile,
            value: input.value,
            date: new Date,
            likes: ""
        }

        if (input.value.trim() !== "") {
            
            axios.post('/twists/' + twistId + '/comments.json', comment)
                .then(() => {
                    inputCopy.value = "";
                    setInput(inputCopy)
                    toast.success('Comment added successfully !')

                    axios.get('/twists/' + twistId + '/comments.json')
                        .then( response => {
                            for (const key in response.data) {
                                if (response.data[key].id === commentId) {
                                    console.log('oui oui');

                                    twistsCopy.comments = { [key] : { ...comment}, ...twistsCopy.comments }
                                    setCurrentTwistSelected(twistsCopy) 
                                    
                                }
                            }
                            
                        })

                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            toast.error('Imossible to publish empty comment')
        }

        
    }

        // Send twist if key 'Enter' is press
        const handleKeyPress = event => {

            // 13 === 'Enter'
            if (event.keyCode === 13) {
                // Call the submit function
                handleNewComment();
            }
        }

    return user ? (
        <div className={classes.AddComment}>
            <div className={classes.container}>
                <div className={classes.subContainer}>
                    <div className={classes.profilePicture}>{!user.linkToProfile ? firstLettersName(user.fullName) : <img src={user.linkToProfile} alt="Profile's picture" />}</div>
                    <input className={classes.input} placeholder='Twist your reply!' value={input.value} onChange={(e) => handleInputChange(e)} onKeyDown={(e) => {handleKeyPress(e)}} ref={commentInput}/> 
            </div>

            <div className={classes.button} onClick={handleNewComment}>
                <Button designType={'Button_twist_mini'}>Reply</Button> 
            </div>
        </div>

        <span className={classes.line}></span>
            
        </div>
    ) : 
    (
        <Loader/>
    )

}

export default AddComment
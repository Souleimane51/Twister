import axios from '../config/axiosFirebase';
import { toast } from 'react-toastify';

// Functions

// On click of like button
const setLike = (twists, twistId, currentUserId) => {

    console.log('TWISTID === ', twistId)
    // Create a copy of the twists
    const twistsCopy = [ ...twists ];
    console.log('TWISTS COPY ===', twistsCopy);


    //* function addLike will be used below to add the current user to the likes collections if he isn't already
    const addLike = (twistIndex, userId) => {

        // Add the current user to the twist's likes collection
        twistsCopy[twistIndex].likes = [...twistsCopy[twistIndex].likes, userId];

        // Add the current user to the firebase's likes collection
        axios.put('/twists/' + twistId + '/likes.json', twistsCopy[twistIndex].likes);
    }


    //* function removeLike will be used below to remove the current user from the likes collections (dislike)
    const removeLike = (twistIndex, userIndex, userId, ) => {
        console.log('REMOVE LIKE');

        // We remove the current user from the clicked twist's likes collection of firebase 
        axios.delete('/twists/' + twistId + '/likes/' + userId + '.json')
            .then(() => {

                // Then to the state
                twistsCopy[twistIndex].likes.splice(userIndex, 1);

                // Then if the likes collection is empty we create it back (otherwise it will be deleted)
                if (twistsCopy[twistIndex].likes.length === 0) {
                    twistsCopy[twistIndex].likes = "";
                    axios.put('/twists/' + twistId + '.json', twistsCopy[twistIndex])
                }
                
            });
          
    }

    // Get the clicked twist index
    let twistIndex;
    for (const key in twistsCopy) {
        if (twistsCopy[key].firebasetwistId === twistId) {
            twistIndex = key;
        }
    } 

    console.log('TWIST INDEX ===', twistIndex);

    if (twistsCopy[twistIndex].likes) {

        // Get the user index in the twist likes collection
        const userIndexIntwistLikes = twistsCopy[twistIndex].likes.indexOf(currentUserId);

        // If the userIndexIntwistLikes is >= 0 that means that it already liked the twist so we remove it
        if (userIndexIntwistLikes >= 0) {
            removeLike(twistIndex, userIndexIntwistLikes, currentUserId)
            // addLike(twistIndex, currentUserId)
        } 
        
        // Otherwise it means that userIndexIntwistLikes is equal to -1 so we add it 
        else {
          addLike(twistIndex, currentUserId)
        }

    } 
    else {
      addLike(twistIndex, currentUserId)
    } 

    console.log('TWISTS COPY ==', twistsCopy)
    return twistsCopy;
}


// On click of retwist button
const setRetwist = (twists, parenttwistValue, parenttwistAuthorUsername, parenttwistId, author) => {
    //deleteTwist(currentTwistSelected.id);
    
    // Create the personal id of the retwist
    const twistId = Math.floor(Math.random() * Date.now());
    const twistsCopy = [...twists];

    // Get the index of the parent twist in the state
    let twistIndex;
    for (const key in twists) {
        if (twists[key].firebasetwistId === parenttwistId) {
            twistIndex = key;
        }
    } 

    // Object that will be sent to the DB
    const twist = {
        twistId: twistId,
        state: "Everyone",
        value: parenttwistValue,
        postedDate: new Date,
        comments: "",
        retwist: "",
        likes: "",
        retwistFrom: parenttwistAuthorUsername,
        // email: author.email,
        // followers: author.followers,
        // following: author.following,
        // fullName: author.fullName,
        authorId: author.id,
        // linkToProfile: author.linkToProfile,
        // username: author.username
    }

    // User can retwist only if he didn't already do it (only once)
    if (!twistsCopy[twistIndex].retwist.includes(author.id)) {

        // Add the current user to the twist collection of the state's parent twist
        twistsCopy[twistIndex].retwist = [ author.id, ...twistsCopy[twistIndex].retwist];

        // Send retwist to DB
        axios.post('/twists.json', twist)
            .then(() => {

                axios.get('/twists.json?orderBy="twistId"&equalTo=' + twistId + '')
                    .then((response) => {
                        for (const key in response.data) {
                            console.log(response);
                            twistsCopy.push({...response.data[key], firebasetwistId: key});
                        }
                    })
            })


        // Add the user that retwisted the panrent twist in its retwist colloction
        axios.put('/twists/' + parenttwistId + '/retwist.json', twistsCopy[twistIndex].retwist)

    }

    // If the user already retwisted we display an error message
    else {
        toast.error('You already retwisted this twist');
    }

    return twistsCopy;

}


// On click of the follow button
const setFollow = (currentUser, users, userId) => {

    console.log(userId);
    // variables required:
    // Create a copie of the user and the followed user to be able to edit them
    const userCopy = {...currentUser};
    const usersCopy = {...users};


    // Add user to following only if he is not already following
    if (!userCopy.following.includes(userId)) {

        // Add the followed user to the following collection of the current user and vice versa in the state
        userCopy.following = [ userId, ...currentUser.following ];
        usersCopy[userId].followers = [ currentUser.id, ...users[userId].followers ];

        // Add the followed user to the following collection of the current user and vice versa in firebase
        axios.put('/users/' + currentUser.id + '/following.json', userCopy.following);
        axios.put('/users/' + userId + '/followers.json', usersCopy[userId].followers);

    }

    // If the user is already followed by the current user:
    else {

        // Get the index of the user and the followed user to be able to delete them (when he unfollows)
        const followingIndex = currentUser.following.indexOf(userId);
        const followersIndex = users[userId].followers.indexOf(currentUser.id);

        // Delete the current user and the one that has been followed
        axios.delete('/users/' + currentUser.id + '/following/' + followingIndex + '.json')
            .then(() => {

                // Remove the user that the current user followed from the state
                userCopy.following.splice(followingIndex, 1);

                // Then if the following collection is empty we create it back (otherwise it will be deleted)
                if (currentUser.following.length === 0) {
                    userCopy.following = "";
                    axios.put('/users/' + currentUser.id + '.json', userCopy)
                }

            });

        axios.delete('/users/' + userId + '/followers/' + followersIndex + '.json')
            .then(() => {

                // Remove the current user from the followers collection of the user he followed from the state
                usersCopy[userId].followers.splice(followersIndex, 1);

                // Then if the followers collection is empty we create it back (otherwise it is deleted)
                if (usersCopy[userId].followers.length === 0) {
                    usersCopy[userId].followers = "";
                    axios.put('/users/' + userId + '.json', usersCopy[userId]) 
                }

            });
    }

    return { userCopy, usersCopy }
}


// On updated profile
const setUpdatedProfile = (userId, users, updatedUser) => {

    const usersCopy = {...users};

    axios.put("/users/" + userId + ".json", updatedUser)
    
    for (const key in usersCopy) {
        
        if (usersCopy[key].id === userId) {
            usersCopy[key] = updatedUser;
        }
    }

    return usersCopy;
}

// Add new twist
const setNewTwist = (fields, setFields, twists, user) => {

    // Publish only if it is not empty
    if (fields.input.value.trim() !== '') {

        let twistsCopy = twists ? [...twists] : []; 
        const newFields = {...fields};
        const twistId = Math.floor(Math.random() * Date.now());

        // Object That will be sent to the DB
        const twist = {
            twistId: twistId,
            state: fields.select.valueSelected,
            value: fields.input.value,
            postedDate: new Date,
            comments: "",
            retwist: "",
            likes: "",
            retwistFrom: "",
            // email: user.email,
            // followers: user.followers,
            // following: user.following,
            // fullName: user.fullName,
            authorId: user.id,
            // linkToProfile: user.linkToProfile,
            // username: user.username
        }
        
        // console.log(twistsCopy);
        // Send twist to DB
        axios.post('/twists.json', twist)
            .then(() => {
                
                console.log('TwistCopy: In the then of firebasemanager of post', twistsCopy);
                console.log('NewTwist: In the then of firebasemanager of post', twist);
                const newTwist = [];
                axios.get('/twists.json?orderBy="twistId"&equalTo=' + twistId + '')
                    .then((response) => {
                        for (const key in response.data) {
                            newTwist.push({...response.data[key], firebasetwistId: key});
                        }
                        twistsCopy.push(...newTwist)

                    })

                // Emty the input field
                newFields.input.value = "";
                setFields(newFields)
                toast.success('Twist posted successfully !');
            })
            console.log('Outside the then twistsCopy ==>', twistsCopy);
            return twistsCopy.reverse();
            
            
            

    }
    else {
        toast.error('Impossible to publish an empty twist');
    }

    

}
    
const setDeleteTwist = (twists, twist) => {
    let twistCopy = [...twists];
    let twistIndex;
    for (const key in twistCopy) {
        if (twistCopy[key].twistId == twist.twistId) {
            twistIndex = key;
        }
    }

    console.log(twistIndex);

    axios.delete('/twists/' + twist.firebasetwistId + '.json')
        .then(() => {
            twistCopy.splice(twistIndex, 1)
        })
        return twistCopy;
}


const firebaseInteractionManager = {
    setLike,
    setRetwist,
    setFollow,
    setUpdatedProfile,
    setNewTwist,
    setDeleteTwist
}

export default firebaseInteractionManager;
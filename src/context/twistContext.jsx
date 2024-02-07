import React, { useState, useRef } from "react";
import firebaseInteractionManager from "../shared/firebaseInteractionManager";

// Creating the context that will store the current user

export const TwistContext = React.createContext(null);

function TwistContextProvider(props) {

  // States
  const [twists, setTwists] = useState([]);
  const [currentTwistSelected, setCurrentTwistSelected] = useState([]);

  // Ref
  const commentInput = useRef(null);

  function handleLike(twistId, currentUserId) {
    // if (twists === undefined) { return }
    console.log('HANDLE TWISTID ==', twistId);
    console.log('HANDLE LIKE');
    console.log('BEFORE : ', twists);
    const updatedTwists = firebaseInteractionManager.setLike(twists, twistId, currentUserId);
    setTwists(updatedTwists);
    
    console.log('AFTER : ', twists);
  }

  function handleRetwist(parenttwistValue, parenttwistAuthorUsername, parenttwistId, author) {
    const updatedTwists = firebaseInteractionManager.setRetwist(twists, parenttwistValue, parenttwistAuthorUsername, parenttwistId, author);
    setTwists(updatedTwists);
  }

  function handleAddTwist(fields, setFields, user) {
    const result =  firebaseInteractionManager.setNewTwist(fields, setFields, twists, user)
    console.log('result ==>', result);
    setTwists(result);
  }

  function deleteTwist(twist) {
    const result = firebaseInteractionManager.setDeleteTwist(twists, twist)
    // console.log(result);
    setTwists(result)
  }


  const twistContextValues = {
    twists,
    setTwists,
    currentTwistSelected,
    setCurrentTwistSelected,
    commentInput,
    handleLike,
    handleRetwist,
    handleAddTwist,
    deleteTwist
    // setCurrentTwistSelected: setCurrentTwistSelected,
    // createNewTwist: createNewTwist,
    // deleteTwist: deleteNewTwist,
  }

  return (
    <TwistContext.Provider value={twistContextValues}>
        {props.children}
    </TwistContext.Provider>
  );
}

export default TwistContextProvider;
import React, {useState} from "react";
import firebaseInteractionManager from "../shared/firebaseInteractionManager";

// Creating the context that will store the current user

export const UserContext = React.createContext(null);

function UserContextProvider({children}) {

  // To store our user
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);

  function handleFollow(userId) {
    const reslut = firebaseInteractionManager.setFollow(user, users, userId);
    setUser(reslut.userCopy);
    setUsers(reslut.usersCopy);
  }

  function handleUpdatedProfile(userId, updatedUser) {
    const result = firebaseInteractionManager.setUpdatedProfile(userId, users, updatedUser);
    setUser(updatedUser);
    setUsers(result);
  }

  const userContextValue = {
    user, 
    setUser,
    users,
    setUsers,
    handleFollow,
    handleUpdatedProfile
  }

  return (
    <UserContext.Provider value={userContextValue}>
        {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
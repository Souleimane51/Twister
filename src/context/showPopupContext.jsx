import React, { useState } from "react";

// Creating the context that will store the current user

export const ShowPopupContext = React.createContext(null);

function ShowPopupContextProvider(props) {

  // States
  const [showPopup, setShowPopup] = useState(false);

  
  const showPopupContextValues = {
    showPopup,
    setShowPopup
  }

  return (
    <ShowPopupContext.Provider value={showPopupContextValues}>
        {props.children}
    </ShowPopupContext.Provider>
  );
}

export default ShowPopupContextProvider;
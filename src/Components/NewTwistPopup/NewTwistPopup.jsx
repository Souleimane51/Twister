// Libraries
import React, { useState, useContext } from 'react';
import classes from './NewTwistPopup.module.css';
import { UserContext } from '../../context/userContext';
import { TwistContext } from '../../context/twistContext';

// Component
import { RxCross2 } from "react-icons/rx";
import firstLettersName from '../../shared/firstLettersName';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import SelectModal from '../SelectModal/SelectModal';
import { ShowPopupContext } from '../../context/showPopupContext';



function NewTwistPopup() {

    // State
    const [fields, setFields] = useState({

        select: {
            valueSelected: "Everyone",
        },

        input: {
            value: ""
        }
    });

    const [showModal, setShowmodal] = useState(false);


    // Context
    const { user } = useContext(UserContext);
    const { handleAddTwist } = useContext(TwistContext);

    const { showPopup, setShowPopup } = useContext(ShowPopupContext)


    // Draft option selected
    const handleToggleSelectValueToDrafts = () => {
        const newFields = {...fields}
        newFields.select.valueSelected = "Drafts (only You)";
        setFields(newFields);
        setShowmodal(false);
    }

    // Everyone option selected
    const handleToggleSelectValueToEveryone = () => {
        const newFields = {...fields}
        newFields.select.valueSelected = "Everyone";
        setFields(newFields);
        setShowmodal(false);
    }

    // Input value changed
    const handleInputChanged = event => {
        const newFields = {...fields}
        newFields.input.value = event.target.value;
        setFields(newFields);
    }

    // Send twist if key 'Enter' is press
    const handleKeyPress = event => {

        // 13 === 'Enter'
        if (event.keyCode === 13) {
            // Call the submit function
            handleAddTwist(fields, setFields, user);
        }
    }

    // Waiting for the user infos
    return user ? (
        <div className={classes.NewTwistPopup} style={!showPopup ? {display: "none"} : {display: "block"}}>
            <div className={classes.container}>
                <RxCross2 className={classes.crossIcon} onClick={() => showPopup ? setShowPopup(false): null}/>
                <div className={classes.firstContainer}>
                    <div className={classes.profilePicture}>{!user.linkToProfile ? firstLettersName(user.fullName) : <img src={user.linkToProfile} alt="Profile's picture" />}</div>
                    <div>
                        <p className={classes.label}>Those who will be able to see your twist:</p>
                        <div className={classes.select} onClick={() => setShowmodal(!showModal)}>{fields.select.valueSelected }{!showModal ? <RiArrowDownSLine className={classes.icon}/> : <RiArrowUpSLine className={classes.icon}/> }</div>
                    </div>
                </div>
                {showModal ?
                    <div className={classes.modalContainer}>
                        <SelectModal 
                            // Props required
                            handleToggleSelectValueToEveryone={handleToggleSelectValueToEveryone}
                            handleToggleSelectValueToDrafts={handleToggleSelectValueToDrafts}
                            valueSelected={fields.select.valueSelected}
                        />
                    </div>

                : null }
                <div className={classes.secondContainer}>
                    <textarea placeholder="What's new ?!" value={fields.input.value} className={classes.textarea} rows="5" onChange={(e) => handleInputChanged(e)} onKeyDown={(e) => {handleKeyPress(e)}}></textarea>
                </div>
                <div className={classes.button} onClick={() => handleAddTwist(fields, setFields, user)}>
                    <Button designType={'Button_twist_mini'}>Twist</Button>
                </div>
                
            </div>
            <div className={classes.bg} onClick={() => showPopup ? setShowPopup(false) : null}></div> 
            
        </div>

    ) : (<Loader />)
}

export default NewTwistPopup
// Libraries
import React, { useState, useEffect, useContext } from 'react';
import classes from './EditProdilePopUp.module.css'
import firstLettersName from '../../../shared/firstLettersName';
import { UserContext } from '../../../context/userContext';


// Components
import Button from '../../UI/Button/Button';
import Inputs from './Inputs/Inputs';

// Icons
import { RxCross2 } from "react-icons/rx";
// import { MdOutlineAddPhotoAlternate } from "react-icons/md";


function EditProfilePopUp({user, showModal, setShowModal}) {

    // State
    const [userCopy, setUserCopy] = useState();
    const [saveClicked, setSaveClicked] = useState(false);

    // Context
    const { handleUpdatedProfile } = useContext(UserContext);


    // UseEffect
    useEffect(() => {
        if (user) {
            setUserCopy({...user})    
        }
    }, []);
    
    // Function coming soon to change profile picture
    // const handleProfileFile = () => {
    //     const userDuplicate = {...userCopy};
    //     let input = document.getElementById("inputProfileFile");
        
    //     let reader = new FileReader;
    //     reader.readAsDataURL(input.files[0]);

    //     reader.onload = () => {
    //         userDuplicate.linkToProfile = reader.result;
    //         setUserCopy(userDuplicate);
    //     };
        
    // }

    // const handleBannerFile = () => {
    //     const userDuplicate = {...userCopy};
    //     let input = document.getElementById("inputBannerFile");
        
    //     let reader = new FileReader;
    //     reader.readAsDataURL(input.files[0]);

    //     reader.onload = () => {
    //         userDuplicate.linkTobg = reader.result;
    //         setUserCopy(userDuplicate);
    //     };
        
    // }


    const handleSave = (inputs) => {

        const userDuplicate = {...userCopy};

        userDuplicate.email != inputs.email.value ? userDuplicate.email = inputs.email.value : null;
        userDuplicate.fullName != inputs.name.value ? userDuplicate.fullName = inputs.name.value : null;
        userDuplicate.username != inputs.username.value ? userDuplicate.username = inputs.username.value : null;
        userDuplicate.bio != inputs.bio.value ? userDuplicate.bio = inputs.bio.value : null;
        userDuplicate.location != inputs.location.value ? userDuplicate.location = inputs.location.value : null;
        userDuplicate.website != inputs.website.value ? userDuplicate.website = inputs.website.value : null;

        setUserCopy(userDuplicate);
        handleUpdatedProfile(user.id, userDuplicate);
        setShowModal(false);

        
        
    }


    return userCopy && (
        <div className={`${classes.EditProdilePopUp} ${showModal ? classes.active : "" }`} >
            <div className={classes.background} onClick={() => setShowModal(false)}></div>
            <div className={classes.EditProdilePopUpContainer}>
                
                <div className={classes.topContainer}>
                    <div className={classes.topLeft}>
                        <span className={classes.crossContainer} title="Cancel" onClick={() => setShowModal(false)}>
                            <RxCross2 className={classes.cross}/>
                        </span>
                        <p className={classes.popUpTitle}>Edit profile</p> 
                    </div>
                    <div className={classes.topRight} title="Save changes" onClick={() => setSaveClicked(true)}>
                        <Button designType={'Button_dark_mini'}>Save</Button>
                    </div>
                    
                </div>
                <div className={classes.middleContainer}>

                    <div className={classes.bannerContainer}>
                        <div className={classes.bannerUploadContainer} /*onClick={() => document.getElementById('inputBannerFile').click()}*/>
                            {/*<input type="file" className={classes.inputFile} id="inputBannerFile" onChange={() => handleBannerFile()}/> 
                            <div className={classes.bannerIconBackCircle}>  
                                <MdOutlineAddPhotoAlternate className={classes.addPhotoIcon}/>
                            </div>
                            <div className={classes.bgBannerFilter} ></div>*/}
                            {!userCopy.linkTobg ?
                                <div className={classes.banner}></div>
                            :
                                <img src={userCopy.linkTobg} alt="Banner Picture" className={classes.bannerPicture}/>
                            }
                        </div>    
                    </div>

                    
                    <div className={classes.profilePictureContainer}>
                        <div className={classes.profileUploadContainer} /*onClick={() => document.getElementById('inputProfileFile').click()}*/>
                                    {/* <input type="file" className={classes.inputFile} id="inputProfileFile" onChange={() => handleProfileFile()}/>
                                    <div className={classes.profileIconBackCircle}>  
                                        <MdOutlineAddPhotoAlternate className={classes.addPhotoIcon}/>
                                    </div>
                                    <div className={classes.bgProfileFilter} ></div> */}
                                    {!userCopy.linkToProfile ?
                                        <p className={classes.firstLetterName}> {firstLettersName(user.fullName)} </p>
                                    :
                                        <img src={userCopy.linkToProfile} alt="Profile Picture" className={classes.profilePicture}/>
                                    }
                        </div>
                    </div>
                </div>
                <div className={classes.fields}>
                    <Inputs
                        user={user}
                        handleSave={(inputs) => handleSave(inputs)}
                        saveClicked={saveClicked}
                        setSaveClicked={setSaveClicked}
                    />
                </div>
                

            </div>
        </div>
    )
}

export default EditProfilePopUp
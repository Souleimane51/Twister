// Libraries
import React from 'react';
import classes from './SelectModal.module.css';

// Components
import { BsPersonFill, BsCheck2 } from 'react-icons/bs';
import { FaEarthAmericas } from 'react-icons/fa6';

function SelectModal({ valueSelected, handleToggleSelectValueToDrafts, handleToggleSelectValueToEveryone }) {
    return (
        <div className={classes.options}>
            <div className={classes.option} onClick={handleToggleSelectValueToEveryone}>
                <FaEarthAmericas className={classes.optionIcon}/>
                <div className={classes.text}><span>Everyone</span></div>
                {valueSelected === "Everyone" ? <BsCheck2 className={classes.iconCheck}/> : null}
            </div>
            <div className={classes.option} onClick={handleToggleSelectValueToDrafts}>
                <BsPersonFill className={`${classes.optionIcon} ${classes.optionIcon2}`}/>
                <div className={classes.text}><span>Draft (only You)</span></div>
                {valueSelected === "Drafts (only You)" ? <BsCheck2 className={classes.iconCheck}/> : null}
            </div>
        </div>
    );
}

export default SelectModal;
// Libraries
import React from 'react'
import classes from './Input.module.css'

function Input({type, focus, config, value, id, changed, focused, blured, full, label, errorMessage}) {

    // Switch for each type of 'input'
    let element;

    switch (type) {

        case('input'):                                       // ↓ Add the class 'focused' if the props focus is equale to true
            element = <>
                        <input className={`${classes.element} ${focus ? classes.focused : ''}`} {...config} value={value} id={id} onChange={changed} onFocus={focused} onBlur={blured}/>
                        <label className={`${classes.label}  ${full ? classes.full : ''}`} htmlFor={id}>{label}</label>
                    </> 
            break;

        case('textarea'):                                       // ↓ Add the class 'focused' if the props focus is equale to true
            element = <>
                        <textarea className={`${classes.elementTextarea} ${focus ? classes.focused : ''}`} value={value} id={id} onChange={changed} onFocus={focused} onBlur={blured}></textarea>
                        <label className={`${classes.labelTextarea}  ${full ? classes.full : ''}`} htmlFor={id}>{label}</label>
                    </>
                
            break;
    }

  

    return (
        <div className={classes.Input}>
            {element}                         {/* ↓ Add the class 'full' if the props full is equale to true */}
            {/* <label className={`${classes.label}  ${full ? classes.full : ''}`} htmlFor={id}>{label}</label> */}
            <span className={classes.errorMessage}>{errorMessage}</span> 
        </div>
    );
}

export default Input
import React from 'react'
import classes from './Button.module.css'

function Button({designType, children}) {

    // Create a switch for each design of button
    let button;
    switch (designType) {
        case 'Button_dark':
            button = <button className={`${classes.button} ${classes.Button_dark}`}>{children}</button>
            break;

        case 'Button_dark_mini':
            button = <button className={`${classes.button} ${classes.Button_dark_mini}`}>{children}</button>
            break;

        case 'Button_red_medium':
            button = <button className={`${classes.button} ${classes.Button_red_medium}`}>{children}</button>
            break;

        case 'Button_red_mini':
            button = <button className={`${classes.button} ${classes.Button_red_mini}`}>{children}</button>
            break;

        case 'Button_gray':
            button = <button className={`${classes.button} ${classes.Button_gray}`}>{children}</button>
            break;

        case 'Button_light':
            button = <button className={`${classes.button} ${classes.Button_light}`}>{children}</button>
            break;

            case 'Button_light_medium':
                button = <button className={`${classes.button} ${classes.Button_light_medium}`}>{children}</button>
                break;

        case 'Button_twist':
            button = <button className={`${classes.button} ${classes.Button_twist}`}>{children}</button>
            break;
        
        case 'Button_twist_mini':
            button = <button className={`${classes.button} ${classes.Button_twist_mini}`}>{children}</button>
            break;
        
    }

    return (
        <>
            {button}
        </>
    )
}

export default Button;
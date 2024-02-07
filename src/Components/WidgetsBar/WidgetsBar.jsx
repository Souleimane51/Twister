// Libraries
import React from 'react';
import classes from './WidgetsBar.module.css';

// Component
import WhoToFollow from '../WhoToFollow/WhoToFollow';
import NoWidgets from './NoWidgests/NoWidgets';

function WidgetsBar(props) {
  return (
    <div className={classes.WidgetsBar}>
        <div className={classes.container}>
          {props.widgets ? <WhoToFollow/> : <NoWidgets/>}
        </div>
    </div>
  )
}

export default WidgetsBar
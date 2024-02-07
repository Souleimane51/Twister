// Libraries
import React, {useState, useEffect} from 'react';
import classes from './Inputs.module.css';
import { checkValidity } from '../../../../shared/utility';

// Component
import Input from '../../../UI/Input/Input'; 

function Inputs({user, handleSave, saveClicked, setSaveClicked}) {

  // States

  // State for the inputs
  const [inputs, setInputs] = useState({
    
    email: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'email',
      },
      value: user.email,
      label: 'Email',

      // To know if user is on the input or not
      focus: false,
      full: true,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: '',
      rules: {
        required: true,
        email: true
      }
    },

    name: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'text',
      },
      value: user.fullName,
      label: 'Name',

      // To know if user is on the input or not
      focus: false,
      full: true,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: '',
      rules: {
        required: true,
      }
    },

    username: {
        // The specs
        elementType: 'input',
        elementConfig: {
          type: 'text',
        },
        value: user.username,
        label: 'Username',
  
        // To know if user is on the input or not
        focus: false,
        full: true,
  
        // The Security & Rules
        submitted: false,
        valid: false,
        errorMessage: '',
        rules: {
          required: true,
        }
    },

    bio: {
        // The specs
        elementType: 'textarea',
        value: user.bio,
        label: 'Bio',
  
        // To know if user is on the input or not
        focus: false,
        full: user.bio ? true : false,
  
        // The Security & Rules
        submitted: false,
        valid: false,
        errorMessage: '',
        rules: {
          required: true,
          minLength: 5
        }
    },

    location: {
        // The specs
        elementType: 'input',
        elementConfig: {
          type: 'text',
        },
        value: user.location,
        label: 'Location',
  
        // To know if user is on the input or not
        focus: false,
        full: user.location ? true : false,
  
        // The Security & Rules
        submitted: false,
        valid: false,
        errorMessage: '',
        rules: {
          required: true,
        }
    },

    website: {
        // The specs
        elementType: 'input',
        elementConfig: {
          type: 'text',
        },
        value: user.website,
        label: 'Website',
  
        // To know if user is on the input or not
        focus: false,
        full: user.website ? true : false,
  
        // The Security & Rules
        submitted: false,
        valid: false,
        errorMessage: '',
        rules: {
          required: true,
          url: true
        }
    },

  });


    useEffect(() => {
        if (saveClicked) {
            handleSave(inputs);
            setSaveClicked(false);
        }
        
    }, [saveClicked])
  

    // State to check if all the inputs are valid
    const [check, setCheck] = useState(false);

    // Functions

    // When user writes in the input, set its value to the 'event.target.value'
    const elementChangedHandler = (event, id) => {
    const newInputs = {...inputs};
    newInputs[id].value = event.target.value;

    // Valid is equal to what is returned by the function 'checkValidity'
    newInputs[id].valid = checkValidity(newInputs[id].value, newInputs[id].rules, inputs, setInputs, id);

    setInputs(newInputs);

    // Verify if all the 3valids3 of the inputs are equale to true 
    let formIsValid = true;
    for (const key in newInputs) {
        formIsValid = newInputs[key].valid && formIsValid;
    }
    setCheck(formIsValid);
    };

    // When user focus on the input
    const elementFocusedHandler = id => {
    const newInputs = {...inputs};
    newInputs[id].focus = true;
    setInputs(newInputs);
    };


    // When user is not focus on the input anymore
    const elementBlurededHandler = id => {
    const newInputs = {...inputs};
    if (newInputs[id].value != '') {
        newInputs[id].focus = false; 
        newInputs[id].full = true
    }
    else {
        newInputs[id].focus = false;
        newInputs[id].full = false;
    }
    setInputs(newInputs);
    };


    // Put each input specs in a array to be able to map it
    const formElementsArray = [];
    for (let key in inputs) {
    formElementsArray.push({
        id: key,
        config: inputs[key]
    });
    };


    // Mapping the array, to each iteration add a new Input component with the props it needs to the form tag
    const fields = formElementsArray.map((input => (
        <div key={input.id} className={classes.input}>
            <Input
                //Props 
                key={input.id}
                id={input.id}
                value={input.config.value}
                type={input.config.elementType}
                config={input.config.elementConfig}
                label={input.config.label}
                changed={(e) => elementChangedHandler(e, input.id)}
                errorMessage={input.config.errorMessage}

                // All these props are for the little animation on the forcus of the inputs
                focus={input.config.focus}
                full={input.config.full}
                focused={() => elementFocusedHandler(input.id)}
                blured={() => elementBlurededHandler(input.id)}
            />
        </div>
    )));

    return (
        <>
            {fields}
        </>
        
    )
    
}
      

export default Inputs;
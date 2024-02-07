// Libraries
import React, {useContext, useEffect, useState} from 'react';
import classes from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';
import routes from '../../config/routes';
import { app } from '../../config/firebase';
import axios from '../../config/axiosFirebase';

// Component
import logo from '../../assets/Logo.png';
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/userContext';



function Signup() {

  const {user} = useContext(UserContext)

  // Variable
  const navigate = useNavigate();

  useEffect(() => {
      if (user) {
        navigate(routes.Home)
      }
  }, [user])

  
  // States

  // State for the inputs
  const [inputs, setInputs] = useState({

    fullName: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'text',
      },
      value: '',
      label: 'Full name',

      // To know if user is on the input or not
      focus: false,
      full: false,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: '',
      rules: {
        required: true,
        minLength: 6,
        maxLength: 30
      }
    },

    username: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'text',
      },
      value: '',
      label: 'Username',

      // To know if user is on the input or not
      focus: false,
      full: false,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: null,
      rules: {
        required: true,
        minLength: 4,
        maxLength: 20
      }
    },

    email: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'email',
      },
      value: '',
      label: 'Email',

      // To know if user is on the input or not
      focus: false,
      full: false,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: '',
      rules: {
        required: true,
        email: true
      }
    },

    password: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'password',
      },
      value: '',
      label: 'Password',

      // To know if user is on the input or not
      focus: false,
      full: false,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: '',
      rules: {
        required: true,
        minLength: 6,
        maxLength: 20,
        password: true
      }
    },

    confirmPassword: {
      // The specs
      elementType: 'input',
      elementConfig: {
        type: 'password',
      },
      value: '',
      label: 'Confirm password',

      // To know if user is on the input or not
      focus: false,
      full: false,

      // The Security & Rules
      submitted: false,
      valid: false,
      errorMessage: '',
      rules: {
        required: true,
        minLength: 6,
        maxLength: 20,
        password: true
      }
    }
  });

  // State to check if all the inputs are valid
  const [check, setCheck] = useState(false);

  const [passwordNotSame, setPasswordNotSame] = useState(false);


  // Functions

  // When user writes in the input, set its value to the 'event.target.value'
  const elementChangedHandler = (event, id) => {
    const newInputs = {...inputs};
    newInputs[id].value = event.target.value;

    // Valid is equal to what is returned by the function 'checkValidity'
    newInputs[id].valid = checkValidity(newInputs[id].value, newInputs[id].rules, inputs, setInputs, id);

    // Check if the 2 password fields are different
    if ( inputs.password.value.length && inputs.confirmPassword.value.length >= 6 && inputs.password.value != inputs.confirmPassword.value) {
      newInputs.password.valid = false;
      newInputs.confirmPassword.valid = false;
      setPasswordNotSame(true);
    }
    else {
      setPasswordNotSame(false)
      newInputs.password.valid = true;
      newInputs.confirmPassword.valid = true;
    }

    setInputs(newInputs);
    
    // Verify if all the valids of the inputs are equale to true 
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


  // When form is submitted
  const formSubmittedHandler = event => {

    // Prevent default behaviour 
    event.preventDefault();

    const newInputs = {...inputs};
    for (const key in newInputs) {
      // Set all the field as 'submitted'
      newInputs[key].submitted = true;
      // Valid is equal to what is returned by the function 'checkValidity'
      checkValidity(newInputs[key].value, newInputs[key].rules, inputs, setInputs, key);
    };

    
    if (passwordNotSame) {
      toast.error('The passwords don\'t match');
    };

    // setInputs(newInputs);

    if (check) {
      const user = {
        fullName: inputs.fullName.value,
        username: '@'+ inputs.username.value,
        email: inputs.email.value,
        joinDate: new Date,
        bio: "",
        location: "",
        website: "",
        linkTobg: "",
        linkToProfile: "",
        following: "",
        followers: ""
      }

      app.auth()
        .createUserWithEmailAndPassword(inputs.email.value, inputs.password.value)
        .then(response => {

          axios.post('/users.json', user)
          .then(response => {
            navigate(routes.Home)
            toast.success('Your account has been created successfully !');
          })
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
                toast.error('This email address is already used');
                newInputs.email.valid = false;
                setInputs(newInputs);
                break;
          }
        });      
    }
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
  let form = (
    <form className={classes.form} onSubmit={(e) => formSubmittedHandler(e)}>
      {formElementsArray.map((input => (
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
      )))}

      <div className={classes.button}>
        <Button designType='Button_dark'>Sign Up</Button>
      </div>
      
    </form>
  )


  return (

    <div className={classes.Signup}>
      <div className={classes.container}>

        <img className={classes.logo} src={logo} alt="Twister's logo" />
        <h1>Create an account</h1>
        {form}

        <div className={classes.login}>
          <p>Already have an account, <Link to={routes.Login}>Login</Link></p>
        </div>
        
      </div>
    </div>
  );

}

export default Signup;
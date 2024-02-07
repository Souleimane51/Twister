export const checkValidity = (value, rules, inputs, setInputs, id) => {
    let isValid = true;
    const newInputs = {...inputs};
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    // Field required
    if (rules.required && newInputs[id].submitted && value.trim() === '') {
        newInputs[id].errorMessage = 'Please fill in this field';
        isValid = false;
    }

    // Check the Min length
    if (rules.minLength && value.trim().length > 0 && value.trim().length <= rules.minLength) {
        isValid = false;
        if (newInputs[id].submitted) {
            newInputs[id].errorMessage = 'This field must be at least ' + rules.minLength + ' caracteres';
        }
    }

    // Check the Max length
    if (rules.maxLength && value.trim().length >= rules.maxLength) {
        isValid = false;
        if (newInputs[id].submitted) {
            newInputs[id].errorMessage = 'This field cannot be longer than ' + rules.maxLength + ' caracteres';
        }    
    }

    // Check the format of the email adresse
    if (rules.email && value.length > 0 && !pattern.test(value)) {
        isValid = false;
        if (newInputs[id].submitted) {
            newInputs[id].errorMessage = "Email address not valid";
        } 
    }

    // Check the format of the url adresse
    if (rules.url && value.length > 0 && !urlPattern.test(value)) {
        isValid = false;
        if (newInputs[id].submitted) {
            newInputs[id].errorMessage = "Url not valid";
        } 
    }

    // if after all the test is valid is equale to true, errorMessage is empty
    if (isValid)  {
        newInputs[id].errorMessage = "";
    }

    setInputs(newInputs);
    return isValid;
}
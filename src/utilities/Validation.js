// validating email
export const emailValidation = (value) => {
  let errors = {};
  let isValid = true;
  if (!value) {
    isValid = false;
    errors["message"] = "Please enter your email address.";
  } else if (typeof value !== "undefined") {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(value)) {
      isValid = false;

      errors["message"] = "Please enter a valid email address.";
    }
  }

  return {
    isValid,
    errors,
  };
};

// validating role
export const roleValidation = (value) => {
  let errors = {};
  let isValid = true;
  if (value && value.length > 0) {
    isValid = true;
    //console.log("roleval", value);
    //errors["message"] = "Please select your role";
  } else {
    isValid = false;
    errors["message"] = "Please select your role";
  }
  return {
    isValid,
    errors,
  };
};

//validating language
export const languageValidation = (value) => {
  let errors = {};
  let isValid = true;
  if (value && Object.keys(value).length > 0) {
    isValid = true;
    //errors["message"] = "Please select your language";
  } else {
    isValid = false;
    errors["message"] = "Please select your language";
  }
  return {
    isValid,
    errors,
  };
};

// Validating password   /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
export const passwordValidation = (value) => {
  let errors = {};
  let isValid = true;
  if (!value) {
    isValid = false;
    errors["message"] = "Please enter your password.";
  }
  // else if( value.length < 8){
  //     isValid = false;
  //     errors["message"] = "Password should be of 8 character";
  // }
  else {
    let pattern = new RegExp(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    );
    if (!pattern.test(value)) {
      isValid = false;
      errors["message"] =
        "Password should be min 8 characters, with at least a special character, upper and lower case letters and a number";
    }
  }
  return {
    isValid,
    errors,
  };
};

// Name validation
export const nameValidation = (value) => {
  let errors = {};
  let isValid = true;
  if (!value) {
    isValid = false;
    errors["message"] = "Please enter your name.";
  } else if (value?.length < 3) {
    isValid = false;
    errors["message"] = "Name should be of length atleast 3 and all alphabet.";
  } else {
    let pattern = new RegExp(/^[a-zA-Z ]{2,30}$/);
    if (!pattern.test(value)) {
      isValid = false;
      errors["message"] = "Name should be only alphabet.";
    }
  }
  return {
    isValid,
    errors,
  };
};

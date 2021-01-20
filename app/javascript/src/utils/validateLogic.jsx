// import React from "react";

// Validate signup

export function validateSignup(values) {
  const errors = {};
  let name = values.name;
  let hasNumber = name.split("").some((char) => Number(char));
  let password = values.password;
  let confirmPassword = values.confirmPassword;
  let isValid = password.split("").some((char) => Number(char));

  if (!name) {
    errors.name = "*name is required";
  } else if (name.length < 4) {
    errors.name = "name must be atleast 5 characters long!!";
  } else if (name.toLocaleLowerCase() !== name) {
    errors.name = "name must be in Lowercase";
  } else if (!hasNumber) {
    errors.name = "name must include atleast one number";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 4) {
    errors.password = "Password length must be atleast 4 characters long";
  } else if (!isValid) {
    errors.password = "Password must contains atleast one number.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (confirmPassword.length < 4) {
    errors.confirmPassword =
      "Password length must be atleast 4 characters long";
  } else if (!isValid) {
    errors.confirmPassword = "Password must contains atleast one number.";
  }
  console.log(errors);
  return errors;
}

// Validate login

export function validateLogin(values) {
  const errors = {};
  let password = values.password;
  let isValid = password.split("").some((char) => Number(char));

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 4) {
    errors.password = "Password length must be atleast 4 characters long";
  } else if (!isValid) {
    errors.password = "Password must contains atleast one number.";
  }
  return errors;
}

export function validateCreatePoll(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.option1) {
    errors.option1 = "Option1 is required";
  }

  if (!values.option2) {
    errors.option2 = "Option2 is required";
  }

  if (!values.option3) {
    errors.option3 = "Option3 is required";
  }

  if (!values.option4) {
    errors.option4 = "Option4 is required";
  }

  return errors;
}

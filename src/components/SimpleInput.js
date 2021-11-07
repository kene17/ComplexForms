import { useEffect, useState } from "react";
//if the input is valid and if it was touched. and if the input is invalid and/or it wasn't touched we want to show the user an error
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  //allows a user a chance to edit it
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && enteredEmail.includes("@");
  const enteredNameIsValid = enteredName.trim() !== ""; //checks if enteredName is valid
  //checks if the overall form is valid, in a case whereby we've multiple inputs
  const [formIsValid, setFormIsValid] = useState(false);
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;
  //or let formIsValid=false;
  //this is used to disable the
  useEffect(() => {
    //we could also add enteredAgeisValid but we dont have it here
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);
  //validate on every keystroke
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    //don't use enteredName cause we would be refering to an old data source cause of react
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const emailInputHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    //current is a pointer to the entered input
    setEnteredNameTouched(true);
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      //the lines below would not be executed
      return;
    }

    //nameInputRef.current.value ='';
    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };
  const nameInputClasses = nameInputIsValid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsValid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {nameInputIsValid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label>Email</label>
        <input
          type="email"
          onBlur={emailInputBlurHandler}
          id="name"
          onChange={emailInputHandler}
          value={enteredEmail}
        />
        {emailInputIsValid && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

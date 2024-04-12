import { useRef } from "react";
import { credentialsDb } from "../database/credentials";

const LoginPage = () => {
  const emailIdInput = useRef(null);
  const passwordInput = useRef(null);
  const loginForm = useRef(null);

  const checkValidUser = (e) => {
    e.preventDefault();
    let validUser = false;

    credentialsDb.forEach((user) => {
      if (
        user.emailId === emailIdInput.current.value &&
        user.password === passwordInput.current.value
      ) {
        validUser = true;
        return;
      }
    });
    validUser ? console.log("Login success") : console.log("Login failed");
    loginForm.current.reset();
  };

  return (
    <div id="loginContainer">
      <form ref={loginForm} onSubmit={(e) => checkValidUser(e)} id="loginForm">
        <label className="inputLabel">EmailId</label>
        <input ref={emailIdInput} type="email"></input>
        <label className="inputLabel">Password</label>
        <input ref={passwordInput} type="password"></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;

import { useRef, useState } from "react";
import { credentialsDb } from "../database/credentials";

const LoginPage = () => {
  const emailIdInput = useRef(null);
  const passwordInput = useRef(null);
  const loginForm = useRef(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkEmailValidity = () => {
    const emailValue = emailIdInput.current.value.trim();
    const isEmailValid =
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(
        emailValue
      );

    if (emailValue !== "") {
      if (!isEmailValid) {
        setEmailError("*Please enter valid email.");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("*Please fill in this field ");
    }

    return isEmailValid;
  };

  const checkPasswordValidity = () => {
    const passwordValue = passwordInput.current.value.trim();
    const isPasswordValid = passwordValue.length > 0;

    if (!isPasswordValid) {
      setPasswordError("*Please fill in this field");
    } else {
      setPasswordError("");
    }

    return isPasswordValid;
  };

  const checkValidUser = (e) => {
    e.preventDefault();
    let validUser = false;

    checkEmailValidity();
    checkPasswordValidity();

    if (checkEmailValidity() && checkPasswordValidity()) {
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
    }
  };

  return (
    <div className="grid grid-cols-2 p-2 bg-neutral-200/50 bg-opa rounded-xl drop-shadow-lg">
      <div
        className="m-3 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('./src/assets/login-bg-image.jpeg')" }}
      ></div>
      <div className=" mx-12 my-24 py-16 " id="loginContainer">
        <form
          className="flex flex-col items-center gap-14"
          ref={loginForm}
          onSubmit={(e) => checkValidUser(e)}
          id="loginForm"
        >
          <div className="relative flex flex-col gap-1">
            <label className="text-xs font-semibold text-neutral-600">
              EMAIL
            </label>
            <input
              className="w-96 px-2 py-2 text-base bg-gray-100/75 rounded-md drop-shadow focus:outline focus:outline-neutral-500"
              ref={emailIdInput}
              type="email"
              onBlur={() => {
                checkEmailValidity();
              }}
              onFocus={() => {
                setEmailError("");
              }}
            ></input>
            {emailError && (
              <p className="absolute -bottom-5 text-sm font-medium text-red-600">
                {emailError}
              </p>
            )}
          </div>
          <div className="relative flex flex-col gap-1">
            <label className="text-xs font-semibold text-neutral-600">
              PASSWORD
            </label>
            <input
              className="w-96 px-2 py-2 text-base bg-gray-100/75 rounded-md drop-shadow focus:outline focus:outline-neutral-500"
              ref={passwordInput}
              type="password"
              onBlur={() => {
                checkPasswordValidity();
              }}
              onFocus={() => {
                setPasswordError("");
              }}
            ></input>
            {passwordError && (
              <p className="absolute -bottom-5 text-sm font-medium text-red-600">
                {passwordError}
              </p>
            )}
          </div>
          <button
            className="w-32 px-8 py-2 text-md font-semibold  text-neutral-50 bg-violet-900 drop-shadow-md rounded-md hover:bg-violet-950"
            type="submit"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

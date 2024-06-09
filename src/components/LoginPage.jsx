import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { setUser } from "../actions/userActions";
import CredentialInput from "./CredentialInput";
import storageManager from "../utils/storageManager";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isNewAccount, setIsNewAccount] = useState(false);
  const [validUser, setValidUser] = useState(null);

  const getUniqueId = () => {
    const uniqueId = uuid();
    return uniqueId;
  };

  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        "*Invalid email address"
      )
      .required("*Please fill in this field"),
    password: Yup.string().required("*Please fill in this field"),
  });

  const signupValidationSchema = Yup.object().shape({
    newEmail: Yup.string()
      .matches(
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        "*Invalid email address"
      )
      .required("*Please fill in this field"),
    newPassword: Yup.string()
      .min(8, "*Must be atleast 8 characters")
      .required("*Please fill in this field"),
    newDob: Yup.string().required("*Please fill in this field"),
  });

  const checkValidUser = (values) => {
    const database = storageManager.loadFromLocalStorage("usersDb");

    database.forEach((user) => {
      if (
        user.credentials.email === values.email &&
        user.credentials.password === values.password
      ) {
        setValidUser(true);
        dispatch(setUser(user));
        navigate("/dashboard");
        return;
      } else {
        setValidUser(false);
      }
    });
  };

  const handleIsNewAccount = () => {
    setIsNewAccount((prevState) => !prevState);
    setValidUser(true);
  };

  const handleAddNewUser = (values) => {
    const credentials = {
      email: values.newEmail,
      password: values.newPassword,
    };

    const newUser = {
      id: getUniqueId(),
      credentials: credentials,
      userDetails: {
        email: values.newEmail,
        dateOfBirth: values.newDob,
      },
    };

    const exisitingUsers = storageManager.loadFromLocalStorage("usersDb") || [];

    const updatedUsers = [...exisitingUsers, newUser];

    storageManager.saveToLocalStorage("usersDb", updatedUsers);
  };

  return (
    <div
      className="login-bg h-full grid place-items-center"
      style={{
        backgroundImage: "url('./src/assets/login-bg.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="z-10 w-4/6 h-4/5 grid grid-cols-2 p-2 bg-neutral-200/75 bg-opa rounded-xl drop-shadow-lg">
        <div
          className="m-3 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('./src/assets/login-card.jpeg')" }}
        ></div>
        <div className="grid grid-rows-[max-content_1fr]">
          <img
            className="justify-self-center mt-5"
            src="./src/assets/logo.svg"
          />
          {isNewAccount ? (
            <>
              <Formik
                initialValues={{ newEmail: "", newPassword: "", newDob: "" }}
                validationSchema={signupValidationSchema}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
                  handleAddNewUser(values);
                }}
              >
                {(formik) => (
                  <div className="place-self-center flex flex-col">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col items-center gap-7"
                    >
                      <CredentialInput
                        name="newEmail"
                        type="email"
                        label="EMAIL"
                      />
                      <CredentialInput
                        name="newPassword"
                        type="password"
                        label="PASSWORD"
                      />
                      <CredentialInput
                        name="newDob"
                        type="date"
                        label="DATE OF BIRTH"
                      />
                      <button
                        className="w-1/2 px-8 py-2 text-md font-semibold  text-neutral-50 bg-neutral-800 drop-shadow-md rounded-md hover:bg-neutral-950"
                        type="submit"
                      >
                        SIGN UP
                      </button>
                    </form>
                    <div className="flex gap-1 mt-4 text-sm font-normal justify-end">
                      <p className="text-neutral-700">
                        Already have an account?
                      </p>
                      <p
                        className="hover:text-violet-900 hover:font-medium cursor-pointer"
                        onClick={handleIsNewAccount}
                      >
                        Sign In
                      </p>
                    </div>
                  </div>
                )}
              </Formik>
            </>
          ) : (
            <>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signinValidationSchema}
                onSubmit={(values) => {
                  checkValidUser(values);
                }}
              >
                {(formik) => (
                  <div className="relative place-self-center flex flex-col">
                    <div className="absolute -top-7 text-red-600 text-bases font-medium text-center">
                      {validUser === false ? (
                        <p className="">Invalid Email or Password</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="relative place-self-center flex flex-col items-center gap-7"
                    >
                      <CredentialInput
                        name="email"
                        type="email"
                        label="EMAIL"
                      />
                      <CredentialInput
                        name="password"
                        type="password"
                        label="PASSWORD"
                      />
                      <button
                        className="w-1/2 px-8 py-2 text-md font-semibold  text-neutral-50 bg-neutral-800 drop-shadow-md rounded-md hover:bg-neutral-950"
                        type="submit"
                      >
                        SIGN IN
                      </button>
                    </form>
                    <div className="flex gap-1 mt-4 text-sm font-normal justify-end">
                      <p className="text-neutral-700">Don't have an account?</p>
                      <p
                        className="hover:text-violet-900 hover:font-medium cursor-pointer"
                        onClick={handleIsNewAccount}
                      >
                        Sign Up
                      </p>
                    </div>
                  </div>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

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
    email: Yup.string()
      .matches(
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        "*Invalid email address"
      )
      .required("*Please fill in this field"),
    password: Yup.string()
      .min(8, "*Must be atleast 8 characters")
      .required("*Please fill in this field"),
    dob: Yup.string().required("*Please fill in this field"),
  });

  const checkValidUser = (values) => {
    let validUser = false;

    const database = storageManager.loadFromLocalStorage("usersDb");

    database.forEach((user) => {
      if (
        user.credentials.email === values.email &&
        user.credentials.password === values.password
      ) {
        validUser = true;
        dispatch(setUser(user));
        navigate("/dashboard");
        return;
      }
    });
    validUser ? console.log("Login success") : console.log("Login failed");
  };

  const handleIsNewAccount = () => {
    setIsNewAccount((prevState) => !prevState);
  };

  const handleAddNewUser = (values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };

    const newUser = {
      id: getUniqueId(),
      credentials: credentials,
      userDetails: {
        email: values.email,
        dateOfBirth: values.dob,
      },
    };

    const exisitingUsers = storageManager.loadFromLocalStorage("usersDb") || [];

    const updatedUsers = [...exisitingUsers, newUser];

    storageManager.saveToLocalStorage("usersDb", updatedUsers);
  };

  return (
    <div
      className="h-full grid place-items-center"
      style={{
        background: `linear-gradient(
        231deg,
        #f4ddff -3.91%,
        #cdd5ef 39.6%,
        #ffdcdc 67.65%,
        #bdeee5 106%
      )`,
      }}
    >
      <div className="grid grid-cols-2 p-2 bg-neutral-200/50 bg-opa rounded-xl drop-shadow-lg">
        <div
          className="m-3 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('./src/assets/login-bg-image.jpeg')" }}
        ></div>
        <div className=" mx-12 my-24 py-16 ">
          {isNewAccount ? (
            <>
              <Formik
                initialValues={{ email: "", password: "", dob: "" }}
                validationSchema={signupValidationSchema}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
                  handleAddNewUser(values);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col items-center gap-7"
                  >
                    <CredentialInput name="email" type="email" label="EMAIL" />
                    <CredentialInput
                      name="password"
                      type="password"
                      label="PASSWORD"
                    />
                    <CredentialInput
                      name="dob"
                      type="date"
                      label="DATE OF BIRTH"
                    />
                    <button
                      className="w-32 px-8 py-2 text-md font-semibold  text-neutral-50 bg-violet-900 drop-shadow-md rounded-md hover:bg-violet-950"
                      type="submit"
                    >
                      SIGN UP
                    </button>
                  </form>
                )}
              </Formik>
              <div className="flex gap-1 mt-4 text-sm font-normal justify-end">
                <p className="text-neutral-700">Already have an account?</p>
                <p
                  className="hover:text-violet-900 hover:font-medium cursor-pointer"
                  onClick={handleIsNewAccount}
                >
                  Sign In
                </p>
              </div>
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
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col items-center gap-7"
                  >
                    <CredentialInput name="email" type="email" label="EMAIL" />
                    <CredentialInput
                      name="password"
                      type="password"
                      label="PASSWORD"
                    />
                    <button
                      className="w-32 px-8 py-2 text-md font-semibold  text-neutral-50 bg-violet-900 drop-shadow-md rounded-md hover:bg-violet-950"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </form>
                )}
              </Formik>
              <div className="flex gap-1 mt-4 text-sm font-normal justify-end">
                <p className="text-neutral-700">Don't have an account?</p>
                <p
                  className="hover:text-violet-900 hover:font-medium cursor-pointer"
                  onClick={handleIsNewAccount}
                >
                  Sign Up
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

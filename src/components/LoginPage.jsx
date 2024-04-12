import { credentialsDb } from "../database/credentials";

const LoginPage = () => {
  const emailIdInput = prompt("Enter your emailId");
  const passwordInput = prompt("Enter your password");
  let validUser = false;

  const checkValidUser = () => {
    credentialsDb.map(
      (user) =>
        (validUser =
          user.emailId === emailIdInput && user.password === passwordInput
            ? true
            : false)
    );
    validUser ? console.log("Login success") : console.log("Login failed");
  };

  checkValidUser();

  return <></>;
};

export default LoginPage;

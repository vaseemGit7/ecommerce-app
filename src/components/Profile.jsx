import { useSelector } from "react-redux";

const Profile = () => {
  const userDetails = useSelector((state) => state.userReducer);

  console.log("the loggined user id is", userDetails);

  return <></>;
};

export default Profile;

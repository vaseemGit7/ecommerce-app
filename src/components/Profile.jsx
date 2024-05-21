import { useSelector } from "react-redux";
import usersDb from "../database/usersData";

const Profile = () => {
  const userDetails = useSelector((state) => state.userReducer);

  const currentUser = usersDb.find((user) => user.id === userDetails.id);

  return (
    <div className="grid place-items-center">
      <div className="flex gap-5 p-5 font-medium text-neutral-900 text-base bg-neutral-50 rounded">
        <div className="rounded-full h-32 w-32 bg-neutral-500"></div>
        <div className="flex flex-col justify-center">
          <p>{currentUser.userName}</p>
          <p>{currentUser.emailId}</p>
          <p>{currentUser.dob}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

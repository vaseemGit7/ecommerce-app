import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.userReducer);

  const currentUser = userData.userDetails;

  console.log(userData.userDetails);

  return (
    <div className="grid place-items-center">
      <div className="flex gap-5 p-5 font-medium text-neutral-900 text-base bg-neutral-50 rounded">
        <div className="rounded-full h-32 w-32 bg-neutral-500"></div>
        <div className="flex flex-col justify-center">
          <p>{currentUser.email}</p>
          <p>{currentUser.dateOfBirth}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

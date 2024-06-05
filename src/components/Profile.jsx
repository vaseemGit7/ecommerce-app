import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.userReducer);
  const [activeSection, setActiveSection] = useState("profileOverview");

  const handleActiveSection = (section) => {
    setActiveSection(section);
  };

  const userDetails = userData.userDetails;
  const userAddress = userData.userDetails.addresses[0];

  console.log(userData.userDetails);

  return (
    <div className="grid grid-rows-[max-content_4fr]">
      <div className="flex gap-2 p-5 place-self-center text-lg font-medium">
        <button
          onClick={() => handleActiveSection("profileOverview")}
          className={`${
            activeSection === "profileOverview"
              ? "bg-neutral-800"
              : "bg-neutral-50 outline outline-2 text-neutral-800 outline-neutral-500"
          } text-neutral-50 px-2 py-1 rounded`}
        >
          Profile Overview
        </button>
        <button
          onClick={() => handleActiveSection("orderHistory")}
          className={`${
            activeSection === "orderHistory"
              ? "bg-neutral-800 text-neutral-50"
              : "bg-neutral-50 outline outline-2 text-neutral-800 outline-neutral-500"
          }  px-2 py-1 rounded`}
        >
          Order History
        </button>
      </div>
      {activeSection === "profileOverview" ? (
        <div className="w-3/6 place-self-center">
          <div className="p-3 bg-slate-100 rounded mb-3 ">
            <p className="text-lg font-medium mb-2">My details</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-sm font-normal">Email</p>
                <p className="text-base font-normal">{userDetails.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-normal">Full name</p>
                <p className="text-base font-normal">{userDetails.fullName}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-normal">Date of birth</p>
                <p className="text-base font-normal">
                  {userDetails.dateOfBirth}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-normal">Phone number</p>
                <p className="text-base font-normal">
                  {userDetails.phoneNumber}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-normal">Postcode</p>
                <p className="text-base font-normal">{userAddress.pincode}</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-100 rounded">
            <p className="text-lg font-medium mb-2">Addresses</p>
            <div>
              <p className="text-base font-normal">{userAddress.flatAddress}</p>
              <p className="text-base font-normal">
                {userAddress.streetAddress}
              </p>
              <p className="text-base font-normal">{userAddress.town}</p>
              <p className="text-base font-normal">{userAddress.state}</p>
              <p className="text-base font-normal">{userAddress.pincode}</p>
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default Profile;

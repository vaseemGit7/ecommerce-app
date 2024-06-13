import { useState } from "react";
import { useSelector } from "react-redux";
import storageManager from "../utils/storageManager";
import UserInformation from "./forms/UserInformation";
import AddressInformation from "./forms/AddressInformation";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";

const Profile = () => {
  const userData = useSelector((state) => state.userReducer);
  const [activeSection, setActiveSection] = useState("profileOverview");
  const [targetAddress, setTargetAddress] = useState(null);
  const [sectionVisibility, setSectionVisiblity] = useState({
    userInformation: true,
    addressInformation: true,
  });

  const database = storageManager.loadFromLocalStorage("usersDb");
  const userDB = database.find((user) => user.id === userData.id);
  const userDetails = userDB.userDetails;
  const userAddresses = userDB?.userDetails?.addresses;

  const handleActiveSection = (section) => {
    setActiveSection(section);
  };

  const handleSectionVisibility = (section) => {
    setSectionVisiblity((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

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
      {activeSection === "profileOverview" && (
        <div className="w-3/6 place-self-center">
          <div className="p-3 bg-neutral-50 outline outline-1 outline-neutral-200 rounded mb-3 ">
            <p className="text-lg font-medium mb-2">My details</p>
            {sectionVisibility.userInformation && userDetails.fullName ? (
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-normal">Email</p>
                    <p className="text-base font-normal">{userDetails.email}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-normal">Full name</p>
                    <p className="text-base font-normal">
                      {userDetails.fullName}
                    </p>
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
                    <p className="text-base font-normal">
                      {/* {userAddress.pincode} */}
                    </p>
                  </div>
                </div>
                <p
                  className="px-1  bg-neutral-50 self-start text-neutral-800 cursor-pointer rounded"
                  onClick={() => handleSectionVisibility("userInformation")}
                >
                  <IonIcon icon={createOutline} className="text-xl" />
                </p>
              </div>
            ) : (
              <UserInformation
                userData={userData}
                handleSectionVisibility={handleSectionVisibility}
              />
            )}
          </div>
          <div className="p-3 bg-neutral-50 outline outline-1 outline-neutral-200 rounded">
            <p className="text-lg font-medium mb-2">Addresses</p>
            {sectionVisibility["addressInformation"] && userAddresses?.[0] ? (
              <div className="flex flex-col">
                {userAddresses.map((userAddress) => (
                  <div
                    key={userAddress.id}
                    className="mb-2 flex justify-between outline outline-1 outline-neutral-400 p-2 rounded-sm"
                  >
                    <div>
                      <p className="text-base font-normal">
                        {userAddress.flatAddress}
                      </p>
                      <p className="text-base font-normal">
                        {userAddress.streetAddress}
                      </p>
                      <p className="text-base font-normal">
                        {userAddress.town}
                      </p>
                      <p className="text-base font-normal">
                        {userAddress.state}
                      </p>
                      <p className="text-base font-normal">
                        {userAddress.pincode}
                      </p>
                    </div>
                    <p
                      className="px-1  bg-neutral-50 self-start text-neutral-800 cursor-pointer rounded"
                      onClick={() => {
                        handleSectionVisibility("addressInformation");
                        setTargetAddress(userAddress.id);
                      }}
                    >
                      <IonIcon icon={createOutline} className="text-xl" />
                    </p>
                  </div>
                ))}
                <button
                  className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-700 text-base text-neutral-50 font-normal rounded hover:bg-neutral-800 hover:shadow-lg"
                  onClick={() => handleSectionVisibility("addressInformation")}
                >
                  Add Address
                </button>
              </div>
            ) : (
              <AddressInformation
                userData={userData}
                targetAddress={targetAddress}
                handleSectionVisibility={handleSectionVisibility}
              />
            )}
          </div>
        </div>
      )}
      {activeSection === "orderHistory" && (
        <div className="w-3/6 place-self-center">
          <div className="p-3 flex flex-col gap-2 items-center bg-neutral-50 outline outline-1 outline-neutral-200 rounded mb-3">
            {[...userDetails.orderHistory].reverse().map((product) => (
              <div
                key={product.id}
                className="w-5/6 p-2 grid grid-cols-[1fr_4fr] outline outline-1 outline-neutral-400 rounded bg-neutral-50"
              >
                <img className="rounded" src={product.image} />
                <div className="p-2 flex flex-col justify-between text-neutral-800">
                  <p className="text-lg font-semibold">{product.name}</p>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">Price : </p>
                    <p className="text-base font-semibold">₹ {product.price}</p>
                  </div>
                  <>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <p className="text-sm font-medium">Total Price : </p>
                          <p className="text-sm font-medium">
                            ₹ {product.price * product.quantity}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-sm font-medium">Color : </p>
                          <p className="text-sm font-medium">{product.color}</p>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-sm font-medium">Order Placed : </p>
                          <p className="text-sm font-medium">
                            {product.orderPlaced}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <p className="text-sm font-medium">Article No. </p>
                          <p className="text-sm font-medium">{product.id}</p>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-sm font-medium">Size : </p>
                          <p className="text-sm font-medium">{product.size}</p>
                        </div>
                        <div className="flex gap-1">
                          <p className="text-sm font-medium">Quantity : </p>
                          <p className="text-sm font-medium">
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2"></div>
                      <div className="flex gap-2"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2"></div>
                      <div className="flex gap-2 "></div>
                    </div>
                  </>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

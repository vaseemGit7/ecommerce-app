import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserInformation from "./forms/UserInformation";
import AddressInformation from "./forms/AddressInformation";
import storageManager from "../utils/storageManager";
import { getCurrentDate } from "../utils/dateHandler";
import { removeAllProductFromCart } from "../actions/userActions";
import ConfirmModal from "./ConfirmModal";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, createOutline } from "ionicons/icons";

const Checkout = () => {
  const location = useLocation();
  const { deliveryCharge, totalPrice } = location.state;
  const userData = useSelector((state) => state.userReducer);
  const cartProduct = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sectionVisibility, setSectionVisiblity] = useState({
    userInformation: true,
    addressInformation: true,
  });
  const [dialogToggle, setDialogToggle] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [targetAddress, setTargetAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const database = storageManager.loadFromLocalStorage("usersDb");
  const userDB = database.find((user) => user.id === userData.id);
  const userDetails = userDB.userDetails;
  const userAddresses = userDB?.userDetails?.addresses;

  const handleSectionVisibility = (section) => {
    setSectionVisiblity((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleDialogToggle = () => {
    setDialogToggle((prevState) => !prevState);
  };

  const handlePlaceOrder = () => {
    const unixDate = Date.now();
    const formattedDate = getCurrentDate(unixDate);
    const updatedCartProducts = cartProduct.map((product) => ({
      ...product,
      orderPlaced: formattedDate,
    }));

    const database = storageManager.loadFromLocalStorage("usersDb");
    const userDB = database.find((user) => user.id === userData.id);
    const existingUsers = database.filter((user) => user.id !== userData.id);

    const existingOrders = userDB.userDetails.orderHistory || [];
    const updatedUserDB = {
      ...userDB,
      userDetails: {
        ...userDB.userDetails,
        orderHistory: [...existingOrders, ...updatedCartProducts],
      },
    };

    const updatedUsers = [...existingUsers, updatedUserDB];
    storageManager.saveToLocalStorage("usersDb", updatedUsers);

    setOrderDetails(cartProduct);
    setInvoiceNo(unixDate);
    setFormattedDate(formattedDate);

    dispatch(removeAllProductFromCart());
    handleDialogToggle();
  };

  useEffect(() => {
    if (!selectedAddress && userAddresses && userAddresses.length > 0) {
      setSelectedAddress(userAddresses[0]);
    }
  }, [userAddresses, selectedAddress]);
  console.log(selectedAddress);
  return (
    <>
      <div
        className="absolute top-20 left-4 flex gap-1 items-center"
        onClick={() => navigate(-1)}
      >
        <IonIcon icon={arrowBackOutline} className="text-lg" />
        <p className="text-lg text-neutral-800 font-medium">Cart</p>
      </div>
      <div className="mx-28">
        <div className="grid grid-cols-[3fr_2fr] ">
          <div className="flex flex-col p-6 gap-3">
            <div>
              <p className="text-2xl font-bold"> Checkout</p>
            </div>
            <div className="p-3">
              <p className="text-lg font-medium mb-4">My information</p>
              {sectionVisibility.userInformation && userDetails.fullName ? (
                <div className="flex justify-between bg-neutral-100 outline outline-1 outline-neutral-200 p-2 rounded">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-neutral-800">
                      {userDetails.fullName}
                    </p>
                    <p className="text-sm font-medium text-neutral-800">
                      {userDetails.email}
                    </p>
                  </div>
                  <p
                    className="text-neutral-800 cursor-pointer rounded"
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
            <div className="p-3">
              <p className="text-lg font-medium mb-4">Billing address</p>
              {sectionVisibility["addressInformation"] && userAddresses?.[0] ? (
                <div className="flex flex-col gap-2">
                  {userAddresses.map((userAddress) => (
                    <div
                      key={userAddress.id}
                      className="flex justify-between bg-neutral-100 outline outline-1 outline-neutral-200  p-2 rounded"
                    >
                      <div>
                        <input
                          type="radio"
                          className="h-4 w-4"
                          value={userAddress}
                          checked={
                            selectedAddress &&
                            selectedAddress.id === userAddress.id
                          }
                          onChange={() => setSelectedAddress(userAddress)}
                        />
                        <div className="flex flex-col gap-1 text-sm font-medium text-neutral-800">
                          <p>{userDB.userDetails.fullName}</p>
                          <p className="mb-1">
                            {userDB.userDetails.phoneNumber}
                          </p>
                          <p>{userAddress.flatAddress}</p>
                          <p>{userAddress.streetAddress}</p>
                          <p>{userAddress.town}</p>
                          <p>{userAddress.state}</p>
                          <p>{userAddress.pincode}</p>
                        </div>
                      </div>
                      <div
                        className="text-neutral-800 cursor-pointer rounded"
                        onClick={() => {
                          handleSectionVisibility("addressInformation");
                          setTargetAddress(userAddress.id);
                        }}
                      >
                        <IonIcon icon={createOutline} className="text-xl" />
                      </div>
                    </div>
                  ))}
                  <button
                    className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-700 text-base text-neutral-50 font-normal rounded hover:bg-neutral-800 hover:shadow-lg"
                    onClick={() =>
                      handleSectionVisibility("addressInformation")
                    }
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
            <div className="p-3">
              <p className="text-lg font-medium mb-4">View order details</p>
              <div className="flex gap-2">
                {cartProduct.map((product) => (
                  <div
                    key={product.id}
                    className="grid w-1/3 grid-rows-[max-content_1fr] text-neutral-800 outline outline-1 outline-neutral-600 rounded p-2"
                  >
                    <img
                      className="place-self-center h-40 rounded"
                      src={product.image}
                    />
                    <div className="grid grid-rows-[max-content_1fr] gap-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <div className="self-end">
                        <p className="text-sm font-medium">₹ {product.price}</p>
                        <div className="flex gap-2">
                          <p className="text-sm font-normal text-neutral-600">
                            Size:
                          </p>
                          <p className=" text-sm font-medium">{product.size}</p>
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm font-normal text-neutral-600">
                            Color:
                          </p>
                          <p className=" text-sm font-medium">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm font-normal text-neutral-600">
                            Total:
                          </p>
                          <p className=" text-sm font-medium">
                            ₹ {product.price * product.quantity}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p className="text-sm font-normal text-neutral-600">
                            Quantity:
                          </p>
                          <p className=" text-sm font-medium">
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 p-3">
            <div className="flex flex-col bg-neutral-50 text-neutral-800 outline outline-1 outline-neutral-200 p-3 rounded-md">
              <div className="flex justify-between pb-3 border-b-2 border-neutral-400">
                <div>
                  <p className=" text-base font-normal">Order value</p>
                  <p className=" text-base font-normal">Delivery charges</p>
                </div>
                <div>
                  <p className=" text-base font-normal">Rs. {totalPrice}</p>
                  <p className=" text-base font-normal">
                    {deliveryCharge === 0 ? "Free" : `Rs. ${deliveryCharge}`}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3">
                <p className="text-xl font-medium">Total charges</p>
                <p className="text-xl font-medium">Rs. {totalPrice}</p>
              </div>
              <button
                className={`py-2 px-3 self-center w-3/5 mt-3 text-center align-middle text-base text-neutral-50 font-normal rounded ${
                  userAddresses.length > 0
                    ? "bg-neutral-700  hover:bg-neutral-800 hover:shadow-lg"
                    : "bg-neutral-500 cursor-default"
                } `}
                onClick={handlePlaceOrder}
                disabled={userAddresses.length > 0 ? false : true}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <ConfirmModal
          dialogToggle={dialogToggle}
          handleDialogToggle={handleDialogToggle}
          userData={userData}
          selectedAddress={selectedAddress}
          orderDetails={orderDetails}
          deliveryCharge={deliveryCharge}
          totalPrice={totalPrice}
          formattedDate={formattedDate}
          invoiceNo={invoiceNo}
        />
      </div>
    </>
  );
};

export default Checkout;

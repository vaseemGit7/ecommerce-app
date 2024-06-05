import { Formik } from "formik";
import * as Yup from "yup";
import DataInput from "./DataInput";
import storageManager from "../../utils/storageManager";

const UserInformation = ({
  userData,
  sectionVisibility,
  handleSectionVisibility,
}) => {
  const database = storageManager.loadFromLocalStorage("usersDb");
  const userDB = database.find((user) => user.id === userData.id);
  const userDetails = userDB.userDetails;

  const userInfoValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("*Please enter your full name"),
    phoneNumber: Yup.number()
      .positive("*A phone number cannot be negative")
      .typeError("*Please enter valid phone number")
      .required("*Please enter your phone number"),
  });

  const handleSubmission = (values) => {
    const updatedUserDB = {
      ...userDB,
      userDetails: { ...userDB.userDetails, ...values },
    };
    const exisitingUsers = database.filter((user) => user.id !== userData.id);

    const updatedUsers = [...exisitingUsers, updatedUserDB];

    storageManager.saveToLocalStorage("usersDb", updatedUsers);

    handleSectionVisibility("userInformation");
  };

  return (
    <>
      {sectionVisibility.userInformation && userDetails.fullName ? (
        <div className="flex justify-between bg-slate-200 p-2 rounded">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-neutral-800">
              {userDetails.fullName}
            </p>
            <p className="text-sm font-medium text-neutral-800">
              {userDetails.email}
            </p>
          </div>
          <p
            className="px-1  bg-neutral-50 self-start text-neutral-800 cursor-pointer rounded"
            onClick={() => handleSectionVisibility("userInformation")}
          >
            E
          </p>
        </div>
      ) : (
        <Formik
          initialValues={{
            fullName: userDetails.fullName || "",
            phoneNumber: userDetails.phoneNumber || "",
            dateOfBirth: userDetails.dateOfBirth || "",
          }}
          validationSchema={userInfoValidationSchema}
          onSubmit={(values) => handleSubmission(values)}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-start gap-2"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-neutral-800">Email</p>
                <p className="text-sm font-medium text-neutral-800">
                  {userDetails.email}
                </p>
              </div>
              <DataInput name="fullName" type="text" label="Full name" />
              <DataInput name="dateOfBirth" type="date" label="Date of birth" />
              <DataInput
                name="phoneNumber"
                type="number"
                label="Phone number"
              />
              <button
                type="submit"
                className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded hover:drop-shadow-lg"
              >
                Save
              </button>
              <button
                type="button"
                className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-50 outline outline-1 outline-neutral-600 text-base text-neutral-800 font-normal rounded hover:drop-shadow-lg"
                onClick={() => handleSectionVisibility("userInformation")}
              >
                Cancel
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default UserInformation;

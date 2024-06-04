import { Formik } from "formik";
import * as Yup from "yup";
import DataInput from "./DataInput";
import storageManager from "../../utils/storageManager";

const UserInformation = ({ userData }) => {
  const userInfoValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("*Please enter your full name"),
    phoneNumber: Yup.number()
      .positive("*A phone number cannot be negative")
      .typeError("*Please enter valid phone number")
      .required("*Please enter your phone number"),
  });

  const handleSubmission = (values) => {
    const database = storageManager.loadFromLocalStorage("usersDb");
    const userDB = database.find((user) => user.id === userData.id);
    const updatedUserDB = {
      ...userDB,
      userDetails: { ...userDB.userDetails, ...values },
    };
    const exisitingUsers = database.filter((user) => user.id !== userData.id);

    const updatedUsers = [...exisitingUsers, updatedUserDB];

    storageManager.saveToLocalStorage("usersDb", updatedUsers);
  };

  return (
    <Formik
      initialValues={{ fullName: "", phoneNumber: "" }}
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
              vaseemahamed1030@gmail.com
            </p>
          </div>
          <DataInput name="fullName" type="text" label="Full name" />
          <DataInput name="dob" type="date" label="Date of birth" />
          <DataInput name="phoneNumber" type="number" label="Phone number" />
          <button
            type="submit"
            className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded hover:drop-shadow-lg"
          >
            Save
          </button>
          <button className="py-2 px-3 self-center w-3/5 mt-3 text-center align-middle bg-neutral-50 outline outline-1 outline-neutral-600 text-base text-neutral-800 font-normal rounded hover:drop-shadow-lg">
            Cancel
          </button>
        </form>
      )}
    </Formik>
  );
};

export default UserInformation;

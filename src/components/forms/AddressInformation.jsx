import { Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import DataInput from "./DataInput";
import storageManager from "../../utils/storageManager";

const AddressInformation = ({ userData }) => {
  const getUniqueId = () => {
    const uniqueId = uuid();
    return uniqueId;
  };

  const addressInfoValidationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("*Please enter an address"),
    flatAddress: Yup.string().required("*Please enter flat no."),
    town: Yup.string().required("*Please enter a town / city"),
    pincode: Yup.number()
      .typeError("*Please enter valid phone number")
      .positive("*Pincode cannot be negative")
      .required("*Please enter a pincode"),
    state: Yup.string().required("*Please enter a state"),
  });

  const handleSubmission = (values) => {
    const newValue = { id: getUniqueId(), ...values };
    const database = storageManager.loadFromLocalStorage("usersDb");
    const userDB = database.find((user) => user.id === userData.id);
    const existingAddresses = userDB.userDetails.addresses || [];
    const updatedUserDB = {
      ...userDB,
      userDetails: {
        ...userDB.userDetails,
        addresses: [...existingAddresses, newValue],
      },
    };
    const existingUsers = database.filter((user) => user.id !== userData.id);

    const updatedUsers = [...existingUsers, updatedUserDB];

    storageManager.saveToLocalStorage("usersDb", updatedUsers);
  };

  return (
    <Formik
      initialValues={{
        streetAddress: "",
        flatAddress: "",
        town: "",
        pincode: "",
        state: "",
      }}
      validationSchema={addressInfoValidationSchema}
      onSubmit={(values) => handleSubmission(values)}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-start gap-2"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-neutral-800">Name</p>
            <p className="text-sm font-medium text-neutral-800">
              Vaseem Ahamed
            </p>
          </div>
          <DataInput name="streetAddress" type="text" label="Street Address" />
          <DataInput
            name="flatAddress"
            type="text"
            label="Flat No. / House name"
          />
          <div className="flex justify-between">
            <DataInput name="town" type="text" label="Town / City" />
            <DataInput name="pincode" type="number" label="Pincode" />
          </div>
          <DataInput name="state" type="text" label="State" />
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
export default AddressInformation;

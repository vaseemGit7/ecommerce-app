import { Field, useField } from "formik";

const CredentialInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-xs font-semibold text-neutral-600">{label}</label>
      <Field
        className="w-96 px-2 py-2 text-base bg-gray-100/75 rounded-md drop-shadow focus:outline focus:outline-neutral-500"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="absolute -bottom-5 text-sm font-medium text-red-600">
          {meta.error}
        </p>
      ) : null}
    </div>
  );
};

export default CredentialInput;

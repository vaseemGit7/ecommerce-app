import { Field, useField } from "formik";

const DataInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-sm font-medium text-neutral-800">{label}</label>
      <Field
        className="w-96 px-2 py-2 text-base outline outline-1 outline-neutral-300 bg-neutral-100 rounded-md focus:outline focus:outline-neutral-500"
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

export default DataInput;

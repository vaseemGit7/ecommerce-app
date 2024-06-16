import { useEffect, useRef } from "react";
import storageManager from "../utils/storageManager";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ userData, dialogToggle, handleDialogToggle }) => {
  const dialogModal = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (dialogToggle) {
      dialogModal?.current?.showModal();
    } else {
      dialogModal?.current?.close();
    }
  }, [dialogToggle]);

  const handleDelete = () => {
    const database = storageManager.loadFromLocalStorage("usersDb");
    const updatedDB = database.filter((user) => user.id !== userData.id);
    storageManager.saveToLocalStorage("usersDb", updatedDB);
    navigate("/", { replace: true });
    handleDialogToggle();
  };

  return (
    <>
      {dialogToggle && (
        <dialog
          className="w-1/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none p-3 rounded-lg outline outline-1 outline-neutral-600"
          ref={dialogModal}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-neutral-900">
              Is this goodbye?
            </p>
            <p className="text-sm font-normal text-neutral-700 text-pretty">
              Deleting your account will remove all your information from our
              database. This cannot be undone
            </p>
            <div className="mt-3 flex justify-between">
              <button
                className="px-3 py-1 outline outline-1 outline-neutral-600 text-base font-medium rounded-sm text-neutral-800 hover:bg-red-600 hover:text-neutral-50 hover:outline-none"
                onClick={handleDelete}
              >
                Delete Anyway
              </button>
              <button
                className="px-3 py-1 outline outline-1 outline-neutral-600 text-base font-medium rounded-sm text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 hover:outline-none"
                onClick={handleDialogToggle}
              >
                Keep Account
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DeleteModal;

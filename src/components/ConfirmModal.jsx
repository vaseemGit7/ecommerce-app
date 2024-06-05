import { useRef, useEffect } from "react";

const ConfirmModal = ({ dialogToggle, handleDialogToggle }) => {
  const dialogModal = useRef(null);

  useEffect(() => {
    if (dialogToggle) {
      dialogModal?.current?.showModal();
    } else {
      dialogModal?.current?.close();
    }
  }, [dialogToggle]);

  const handleNext = () => {
    handleDialogToggle();
  };

  return (
    <>
      {dialogToggle && (
        <div className="fixed inset-0 bg-neutral-600 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <dialog
            className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none p-3 rounded-lg"
            ref={dialogModal}
          >
            <div className="flex flex-col gap-3 items-center">
              <p className="text-xl font-semibold text-neutral-900">
                Thank you for your purchase!
              </p>
              <button className="px-3 py-2 w-3/4 bg-neutral-800 font-medium text-neutral-50 rounded hover:drop-shadow-md">
                Download Invoice
              </button>
              <p
                className="text-base font-medium hover:border-b-2 border-b-neutral-900 cursor-pointer"
                onClick={handleNext}
              >
                Continue Shopping
              </p>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;

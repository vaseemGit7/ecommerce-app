const DetailLoading = () => {
  return (
    <div className="grid h-full grid-cols-2 p-7  bg-slate-100 rounded">
      <div className="w-5/6 animate-pulse justify-self-center bg-neutral-200  rounded"></div>
      <div className="p-5 flex flex-col gap-2 ">
        <div className="animate-pulse h-5 w-1/2 mt-2 bg-neutral-300 rounded"></div>
        <div className="animate-pulse h-4 w-1/5 mt-2 bg-neutral-300 rounded"></div>
        <button className="py-2 px-3 w-3/5 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded">
          Add
        </button>
        <div>
          <p className="text-lg font-medium">DESCRIPTION</p>
          <div className="animate-pulse h-4 w-5/6 mt-2 bg-neutral-300 rounded"></div>
          <div className="animate-pulse h-4 w-5/6 mt-2 bg-neutral-300 rounded"></div>
          <div className="animate-pulse h-4 w-5/6 mt-2 bg-neutral-300 rounded"></div>
          <div className="animate-pulse h-4 w-3/4 mt-2 bg-neutral-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailLoading;

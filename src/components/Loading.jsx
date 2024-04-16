const Loading = () => {
  console.log("Fallback is called");
  return (
    <>
      <div className="h-full grid place-items-center">
        <div className="flex items-center px-4 py-2 rounded-lg bg-violet-900 gap-2">
          <div className="w-6 h-6 border-4 border-white border-b-violet-900 rounded-full inline-block animate-spin">
            {" "}
          </div>
          <span className="text-md font-semibold text-neutral-50">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default Loading;

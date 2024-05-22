const ProductLoading = () => {
  const skeletonCards = [];

  for (let i = 0; i < 12; i++) {
    skeletonCards.push(
      <div
        key={i}
        className="h-96 flex flex-col gap-1 p-2 bg-slate-50 text-neutral-900 rounded hover: drop-shadow-md hover:scale-105"
      >
        <div className="animate-pulse h-5/6 bg-neutral-300"></div>
        <div className="flex flex-col justify-between">
          <div className="animate-pulse h-4 w-5/6 mt-2 bg-neutral-300 rounded"></div>
          <div className="animate-pulse h-4 w-1/5 mt-2 bg-neutral-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "30px",
        marginTop: "30px",
      }}
    >
      {skeletonCards}
    </div>
  );
};

export default ProductLoading;

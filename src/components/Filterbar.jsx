const Filterbar = () => {
  return (
    <div className="flex flex-col px-4 py-3 gap-10 text-neutral-50 font-semibold bg-neutral-700 rounded-lg">
      <p className="text-xl font-semibold self-center">Filters</p>
      <div>
        <p className="text-lg font-medium">Sort by</p>
        <div>
          <label>
            <input type="radio" value="stock" />
            Recommended
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="newProduct" />
            Newest
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="ascPrice" />
            Lowest Price
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="descPrice" />
            Highest Price
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;

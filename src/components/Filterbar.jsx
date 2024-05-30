const Filterbar = ({ sortBy, handleSortByChange }) => {
  return (
    <div className="flex flex-col px-4 py-3 gap-10 text-neutral-50 font-semibold bg-neutral-700 rounded-lg">
      <p className="text-xl font-semibold self-center">Filters</p>
      <div>
        <p className="text-lg font-medium">Sort by</p>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="stock"
              checked={sortBy === "stock"}
              onChange={handleSortByChange}
            />
            Recommended
          </label>
        </div>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="newProduct"
              checked={sortBy === "newProduct"}
              onChange={handleSortByChange}
            />
            Newest
          </label>
        </div>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="ascPrice"
              checked={sortBy === "ascPrice"}
              onChange={handleSortByChange}
            />
            Lowest Price
          </label>
        </div>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="descPrice"
              checked={sortBy === "descPrice"}
              onChange={handleSortByChange}
            />
            Highest Price
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;

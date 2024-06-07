import { useDispatch, useSelector } from "react-redux";
import { setParam } from "../actions/filterActions";
import FilterOptions from "./FilterOptions";

const Filterbar = () => {
  const paramsData = useSelector((state) => state.paramsReducer);
  const resultData = useSelector((state) => state.dataReducer);
  const dispatch = useDispatch();

  const handleChange = (filter, e) => {
    dispatch(setParam(filter, e.target.value));
  };

  const getFacet = (facetCode) => {
    return resultData?.facets?.find((item) => item.code === facetCode);
  };

  const shouldShowFacet = (facet) => {
    return facet?.values?.some((value) => value.count !== 0);
  };

  const occasionFacet = getFacet("contexts");
  const conceptFacet = getFacet("concepts");
  const fitFacet = getFacet("fits");
  const colorFacet = getFacet("colorWithNames");
  const functionFacet = getFacet("functions");

  return (
    <div className="h-screen sticky top-0 flex flex-col px-4 py-3 gap-10 text-neutral-50 font-semibold bg-neutral-700 rounded-lg  overflow-y-auto">
      <p className="text-xl font-semibold self-center">Filters</p>
      <div>
        <p className="text-lg font-medium">Sort by</p>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="stock"
              checked={paramsData.sortBy === "stock"}
              onChange={(e) => {
                handleChange("sortBy", e);
              }}
            />
            Recommended
          </label>
        </div>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="newProduct"
              checked={paramsData.sortBy === "newProduct"}
              onChange={(e) => {
                handleChange("sortBy", e);
              }}
            />
            Newest
          </label>
        </div>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="ascPrice"
              checked={paramsData.sortBy === "ascPrice"}
              onChange={(e) => {
                handleChange("sortBy", e);
              }}
            />
            Lowest Price
          </label>
        </div>
        <div>
          <label className="text-base font-normal cursor-pointer">
            <input
              type="radio"
              value="descPrice"
              checked={paramsData.sortBy === "descPrice"}
              onChange={(e) => {
                handleChange("sortBy", e);
              }}
            />
            Highest Price
          </label>
        </div>
      </div>
      {shouldShowFacet(occasionFacet) && (
        <FilterOptions facetName={"Occasion"} facets={occasionFacet} />
      )}
      {shouldShowFacet(conceptFacet) && (
        <FilterOptions facetName={"Concept"} facets={conceptFacet} />
      )}
      {shouldShowFacet(fitFacet) && (
        <FilterOptions facetName={"Fit"} facets={fitFacet} />
      )}
      {shouldShowFacet(colorFacet) && (
        <FilterOptions facetName={"Color"} facets={colorFacet} />
      )}
      {shouldShowFacet(functionFacet) && (
        <FilterOptions facetName={"Function"} facets={functionFacet} />
      )}
    </div>
  );
};

export default Filterbar;

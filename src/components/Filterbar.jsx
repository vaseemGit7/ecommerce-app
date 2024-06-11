import { useDispatch, useSelector } from "react-redux";
import { setParam } from "../actions/filterActions";
import FilterOptions from "./FilterOptions";
import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";

const Filterbar = () => {
  const paramsData = useSelector((state) => state.paramsReducer);
  const resultData = useSelector((state) => state.dataReducer);
  const dispatch = useDispatch();
  const [toggleFacet, setToggleFacet] = useState({
    Sort: false,
    Occasion: false,
    Concept: false,
    Fit: false,
    Color: false,
    Function: false,
  });

  const handleChange = (filter, e) => {
    dispatch(setParam(filter, e.target.value));
  };

  const handleFacetToggle = (section) => {
    setToggleFacet((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
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
    <div className="h-screen sticky top-16 flex flex-col px-4 py-3 gap-5 border border-neutral-200  text-neutral-800 font-medium rounded-lg  overflow-y-auto bg-white bg-opacity-30 backdrop-blur-md  border-white/30 p-6 shadow-lg">
      <p className="text-xl font-semibold self-center">Filters</p>
      <div className="flex flex-col gap-3">
        <div
          className="flex justify-between items-center"
          onClick={() => handleFacetToggle("Sort")}
        >
          <p className="text-base font-medium">Sort by</p>
          <IonIcon
            icon={toggleFacet["Sort"] ? chevronUpOutline : chevronDownOutline}
          ></IonIcon>
        </div>
        {toggleFacet["Sort"] && (
          <>
            <div>
              <label className="flex items-center gap-2 text-base font-normal cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4"
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
              <label className="flex items-center gap-2 text-base font-normal cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4"
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
              <label className="flex items-center gap-2 text-base font-normal cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4"
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
              <label className="flex items-center gap-2 text-base font-normal cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4"
                  value="descPrice"
                  checked={paramsData.sortBy === "descPrice"}
                  onChange={(e) => {
                    handleChange("sortBy", e);
                  }}
                />
                Highest Price
              </label>
            </div>
          </>
        )}
      </div>
      {shouldShowFacet(occasionFacet) && (
        <FilterOptions
          facetName={"Occasion"}
          facets={occasionFacet}
          handleFacetToggle={handleFacetToggle}
          toggleFacet={toggleFacet}
        />
      )}
      {shouldShowFacet(conceptFacet) && (
        <FilterOptions
          facetName={"Concept"}
          facets={conceptFacet}
          handleFacetToggle={handleFacetToggle}
          toggleFacet={toggleFacet}
        />
      )}
      {shouldShowFacet(fitFacet) && (
        <FilterOptions
          facetName={"Fit"}
          facets={fitFacet}
          handleFacetToggle={handleFacetToggle}
          toggleFacet={toggleFacet}
        />
      )}
      {shouldShowFacet(colorFacet) && (
        <FilterOptions
          facetName={"Color"}
          facets={colorFacet}
          handleFacetToggle={handleFacetToggle}
          toggleFacet={toggleFacet}
        />
      )}
      {shouldShowFacet(functionFacet) && (
        <FilterOptions
          facetName={"Function"}
          facets={functionFacet}
          handleFacetToggle={handleFacetToggle}
          toggleFacet={toggleFacet}
        />
      )}
    </div>
  );
};

export default Filterbar;

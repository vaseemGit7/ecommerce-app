import { useDispatch, useSelector } from "react-redux";
import { setParam } from "../actions/filterActions";
import { IonIcon } from "@ionic/react";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";

const FilterOptions = ({
  facetName,
  facets,
  handleFacetToggle,
  toggleFacet,
}) => {
  const paramsData = useSelector((state) => state.paramsReducer);
  const dispatch = useDispatch();

  const handleChange = (filter, value) => {
    const currentValues = paramsData[filter] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((val) => val !== value)
      : [...currentValues, value];
    dispatch(setParam(filter, updatedValues));
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => handleFacetToggle(facetName)}
      >
        <p className="text-base font-medium">{facetName}</p>
        <IonIcon
          icon={toggleFacet[facetName] ? chevronUpOutline : chevronDownOutline}
        ></IonIcon>
      </div>
      {facets &&
        toggleFacet[facetName] &&
        facets.values.map(
          (option) =>
            option.count !== 0 && (
              <div
                key={option.code}
                className="flex justify-between items-center gap-1"
              >
                <label className="flex items-center gap-2 text-base font-normal cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-sm accent-neutral-800"
                    value={option.code}
                    checked={
                      Array.isArray(paramsData[facets.code]) &&
                      paramsData[facets.code].includes(option.code)
                    }
                    onChange={() => {
                      handleChange(`${facets.code}`, option.code);
                    }}
                  />
                  {facetName === "Color"
                    ? option.code.split("_")[0].charAt(0).toUpperCase() +
                      option.code.split("_")[0].slice(1)
                    : option.code}
                </label>
                <p className="text-base font-normal text-neutral-600">
                  {option.count}
                </p>
              </div>
            )
        )}
    </div>
  );
};

export default FilterOptions;

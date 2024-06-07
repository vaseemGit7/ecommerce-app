import { useDispatch, useSelector } from "react-redux";
import { setParam } from "../actions/filterActions";

const FilterOptions = ({ facetName, facets }) => {
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
    <div className="flex flex-col gap-1">
      <p className="text-lg font-medium">{facetName}</p>
      {facets &&
        facets.values.map((option) => (
          <div key={option.code} className="flex justify-between">
            <label className="text-base font-normal cursor-pointer">
              <input
                type="checkbox"
                value={option.code}
                checked={
                  Array.isArray(paramsData[facets.code]) &&
                  paramsData[facets.code].includes(option.code)
                }
                onChange={() => {
                  handleChange(`${facets.code}`, option.code);
                }}
              />
              {option.code}
            </label>
            <p className="text-base font-normal">{option.count}</p>
          </div>
        ))}
    </div>
  );
};

export default FilterOptions;

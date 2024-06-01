import { useDispatch, useSelector } from "react-redux";
import { setParam } from "../actions/filterActions";

const FilterOptions = ({ facetName, facets }) => {
  const paramsData = useSelector((state) => state.paramsReducer);
  const dispatch = useDispatch();

  const handleChange = (filter, e) => {
    dispatch(setParam(filter, e.target.value));
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-lg font-medium">{facetName}</p>
      {facets &&
        facets.values.map((option) => (
          <div key={option.code} className="flex justify-between">
            <label className="text-base font-normal cursor-pointer">
              <input
                type="radio"
                value={option.code}
                checked={paramsData.contexts === option.code}
                onChange={(e) => {
                  handleChange("contexts", e);
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

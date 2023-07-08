import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortFilter = searchParams.get("sortBy") || "";
  function handleChange(evt) {
    searchParams.set("sortBy", evt.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={sortFilter}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;

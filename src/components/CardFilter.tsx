import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

const CardFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const [inputValue, setInputValue] = useState(filter);

  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: string) => {
        setFilter(value);
      }, 300),
    [setFilter]
  );

  useEffect(() => {
    debouncedSetFilter(inputValue);
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [inputValue, debouncedSetFilter]);

  useEffect(() => {
    setInputValue(filter);
  }, [filter]);

  return (
    <input
      type="text"
      placeholder="Filter by brand or last 4..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="border p-2 w-64 rounded-md"
    />
  );
};

export default CardFilter;

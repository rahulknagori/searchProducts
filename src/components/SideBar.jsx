import { useState } from "react";
const categories = require("../utils/categories.json");

const Sidebar = ({
  selectedFilters,
  setSelectedFilters,
  selectedPriceRange,
  setSelectedPriceRange,
}) => {
  const handleFilterSelect = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handlePriceRangeSelect = (price) => {
    if (selectedPriceRange.includes(price)) {
      setSelectedPriceRange(selectedPriceRange.filter((p) => p !== price));
    } else {
      setSelectedPriceRange([...selectedPriceRange, price]);
    }
  };
  return (
    <aside className="w-64 bg-gray-300 p-5">
      <nav className="list-none">
        <h2 className="text-lg font-medium mb-3">Filters</h2>
        <ul className="mt-5">
          {categories["categories"].map((category) => {
            return (
              <li
                key={category.id}
                className="flex items-center mb-2 cursor-pointer hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  className="form-checkbox mr-2"
                  id={category.mainCategory}
                  onChange={() => handleFilterSelect(category.mainCategory)}
                />
                <label
                  htmlFor={category.mainCategory}
                  className="text-gray-800 hover:text-teal-500"
                >
                  {category.mainCategory}
                </label>
              </li>
            );
          })}
        </ul>
        <h2 className="text-lg font-medium mb-3 mt-5">Price Range</h2>
        <ul className="mt-5">
          {[
            "5000-10000",
            "10000-20000",
            "20000-30000",
            "30000-40000",
            "40000-80000",
          ].map((price) => {
            return (
              <li
                key={price}
                className="flex items-center mb-2 cursor-pointer hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  className="form-checkbox mr-2"
                  id={price}
                  onChange={() => handlePriceRangeSelect(price)}
                />
                <label
                  htmlFor={price}
                  className="text-gray-800 hover:text-teal-500"
                >
                  {price}
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

import { useState } from "react";
import categories from "../utils/categories.json";
import { useDispatch } from "react-redux";
import { addProducts, productsNotFound } from "../features/productSlice";

const SearchBar = ({ selectedPriceRange }) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    const searched = search(searchValue, selectedPriceRange);
    dispatch(addProducts(searched));
    let isNotEmpty = searched.some((item) => {
      return item.subCategories.length > 0;
    });
    if (!isNotEmpty) {
      let notFoundToJson = JSON.stringify({
        searchedValue: searchValue,
        priceRange: selectedPriceRange,
      });
      dispatch(productsNotFound(notFoundToJson));
    }
    resetInputField();
  };

  const search = (searchTerm, priceRange) => {
    const rangeBounds = priceRange.map((range) =>
      range.split("-").map((price) => parseInt(price.trim()))
    );

    const filteredProducts = categories.categories.reduce(
      (products, category) => {
        let filteredSubCategories = [];
        if (priceRange.length > 0) {
          filteredSubCategories = category.subCategories.filter(
            (subCategory) => {
              return (
                subCategory.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) &&
                rangeBounds.some(
                  ([lower, upper]) =>
                    subCategory.price >= (lower || 0) &&
                    subCategory.price <= (upper || Infinity)
                )
              );
            }
          );
        } else {
          filteredSubCategories = category.subCategories.filter(
            (subCategory) => {
              return subCategory.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            }
          );
        }

        return [
          ...products,
          {
            mainCategory: category.mainCategory,
            id: category.id,
            subCategories: filteredSubCategories,
          },
        ];
      },
      []
    );
    return filteredProducts;
  };

  return (
    <form className="w-full max-w-sm">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search..."
          aria-label="Search Input"
          onChange={handleSearchInputChanges}
          value={searchValue}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
          onClick={callSearchFunction}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

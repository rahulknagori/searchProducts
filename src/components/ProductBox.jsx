import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import categories from "../utils/categories.json";
import { addProducts } from "../features/productSlice";
import { useEffect } from "react";

const ProductBox = ({ selectedFilters, selectedPriceRange }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsNotFound = useSelector(
    (state) => state.products.productsNotFound
  );

  const [showNotFound, setShowNotFound] = useState(false);

  const filteredCategories = categories["categories"].filter((category) => {
    return (
      selectedFilters.length === 0 ||
      selectedFilters.includes(category.mainCategory)
    );
  });

  const filterPriceRange = filteredCategories.map((category) => {
    if (selectedPriceRange.length > 0) {
      const rangeBounds = selectedPriceRange.map((range) =>
        range.split("-").map((price) => parseInt(price.trim()))
      );
      const subCategories = category.subCategories.filter((subCategory) => {
        const price = subCategory.price;
        return rangeBounds.some(
          ([lower, upper]) => price >= lower && price <= upper
        );
      });
      return { ...category, subCategories };
    } else {
      return category;
    }
  });

  useEffect(() => {
    dispatch(addProducts(filterPriceRange));
  }, [selectedFilters, selectedPriceRange, dispatch]);

  return (
    <div>
      <button
        onClick={() => setShowNotFound(!showNotFound)}
        className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
      >
        {showNotFound ? "Hide not found products" : "Show not found products"}
      </button>
      {!showNotFound &&
        products.map((mainCategory) => (
          <div key={mainCategory.id}>
            {/* <h2>{mainCategory.mainCategory}</h2> */}
            <ul className="grid grid-cols-3 gap-5">
              {mainCategory.subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className="bg-white p-5 mb-5 shadow-md rounded w-64"
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt="product"
                    className="w-full h-32 mb-5"
                  />
                  <h2 className="text-lg font-medium mb-3">
                    {subCategory.name}
                  </h2>
                  <p className="text-gray-600">₹{subCategory.price}</p>
                </div>
              ))}
            </ul>
          </div>
        ))}
      {showNotFound &&
        (productsNotFound.length > 0 ? (
          <ul>
            {productsNotFound.map((item) => {
              let parsedItem = JSON.parse(item);
              return (
                <li key={item}>
                  <p>Product Name:{parsedItem.searchedValue}</p>
                  <p>Price Range:{parsedItem.priceRange}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-red-700">
            Nothing to Display - Please search for a product randomly
          </p>
        ))}
    </div>
  );
};

export default ProductBox;

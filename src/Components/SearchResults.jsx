import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GB_CURRENCY } from "../utils/constants";

import { callAPI } from "../utils/CallApi";
import { ProductDetails } from ".";

const SearchResults = () => {
  const [seachParams] = useSearchParams();
  const [products, setProducts] = useState(null);

  // console.log(seachParams);

  const getSearchResults = () => {
    const searchTerm = seachParams.get("searchTerm");
    const category = seachParams.get("category");

    callAPI(`data/search.json`).then((searchResults) => {
      const categoryResults = searchResults[category];
      if (searchTerm) {
        const results = categoryResults.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(results);
      } else {
        setProducts(categoryResults);
      }
    });
  };

  useEffect(() => {
    getSearchResults();
  }, [seachParams]);

  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto">
      {products &&
        products.map((product, key) => {
          return (
            <Link key={key} to={`/product/${product.id}`}>
              <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-1 bg-purple-500">
                <div className="col-span-2 p-4 bg-gray-200">
                  <img src={product.image_small} alt="" />
                </div>
                <div className="col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100">
                  <div className="font-medium text-black p-2">
                    <ProductDetails product={product} ratings={true} />
                    <div className="text-xl xl:text-2xl pt-1">
                      {GB_CURRENCY.format(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchResults;

import React, { useState, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigateto = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigateto(`/products/${keyword}`);
    } else {
      navigateto("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search Products" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
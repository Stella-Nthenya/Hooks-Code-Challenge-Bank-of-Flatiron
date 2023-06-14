import React from "react";

function Search(onSearch) {
  const handleSearch = (e) => {
    const searchItem = e.target.value;
    onSearch(searchItem);
  };
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        // value={searchItem}
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;

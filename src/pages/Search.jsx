import "./Search.css";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";

const processSearch = async (searchFilters, setSearchResults) => {
  try {
    const response = await fetch(
      `http://172.16.2.194:8888/search?query=${searchFilters.query}&location=${searchFilters.location}&category=${searchFilters.category}`
    );
    const data = await response.json();
    if (data) setSearchResults(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleDelete = async (itemId, setSearchResults) => {
  try {

    await axios.delete(`http://172.16.2.194:8888/delete/${itemId}`);

    setSearchResults((prevResults) =>
      prevResults.filter((item) => item.id !== itemId)
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// const handleEdit = async (itemId, newQtyStr, setSearchResults) => {
//   if (newQtyStr === "") return
//   let newQty = parseInt(newQtyStr)

//   try {
    
//     await axios.patch(``);

    

//   } catch (error) {
//     console.error("Error deleting item:", error);
//   }
// };
const Search = () => {
  const [newQty, setNewQty] = useState(0)
  
  const handleQtyChange = (event) => {
    setNewQty(event.target.value)
    console.log(event.target.value)
  }
  
  const formattedExpiry = (expiry) => {
    const isDefaultTime = expiry === "0001-01-01T00:00:00Z";

    if (isDefaultTime) return "none";

    const date = new Date(expiry);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(2);

    return `${month}/${day}/${year}`;
  };

  const [searchFilters, setSearchFilters] = useState({
    query: "",
    location: "",
    category: "",
    recent: true,
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = debounce((event) => {
    const value = event.target.value;

    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      query: value,
    }));
  }, 800);

  useEffect(() => {
    processSearch(searchFilters, setSearchResults);
  }, [searchFilters]);

  return (
    <div className="search-container">
      <div className="search-results">
        {searchResults.map((item) => (
          <div key={item.id} className="card">
            <div className="item-name">
              <p className="card-min-location">{item.location}</p>
              <h1 className="card-heading">{item.name}</h1>
              <p className="card-min-location">
                {"exp. "}
                {formattedExpiry(item.expiry)}
              </p>
            </div>
            <div className="edit-qty">
              <div className="qty-text">
                <p className="card-min-unit">
                  {item.quantity +
                    (item.unit === "pounds"
                      ? " lbs"
                      : item.unit === "numItems"
                      ? " item(s)"
                      : item.unit === "percentage"
                      ? "%"
                      : "")}{" "}
                  {" " + "rem."}
                </p>
              </div>
              <form className="qty-form">
                <input
                  placeholder="qty"
                  type="number"
                  className="qty-input"
                  size="2"
                  onChange={handleQtyChange}
                ></input>
                <button type="submit" className="edit-btn" onClick={() => handleEdit(item.id, newQty, setSearchResults)}>
                  <span>
                    <AiFillEdit size={17} />
                  </span>
                </button>
              </form>
              <div className="card-expiring"></div>
            </div>
            <div className="delete">
              <button
                type="submit"
                id="delete"
                className="delete-btn"
                onClick={() => handleDelete(item.id, setSearchResults)}
              >
                <span>
                  <AiFillDelete size={18} />
                </span>
              </button>
            </div>
          </div>
        ))}

        <div className="search-div">
          <form className="search-form">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search items, categories, ..."
                onChange={handleSearchInputChange}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;

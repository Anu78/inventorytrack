import "./Search.css";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";

const processSearch = async (query, category, location, setSearchResults) => {
  try {
    const response = await fetch(
      `http://172.16.3.76:8888/search?query=${query}&location=${location}&category=${category}`,
    );
    const data = await response.json();
    setSearchResults(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleDelete = async (itemId, setSearchResults) => {
  try {
    await axios.delete(`http://172.16.3.76:8888/delete/${itemId}`);

    setSearchResults((prevResults) =>
      prevResults.filter((item) => item.id !== itemId),
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const handleEdit = async (
  itemId,
  setSearchResults,
  setNewQty,
  newlocation = null,
  newQtyStr = null,
) => {
  if (newQtyStr === "") return;
  let newQty = parseFloat(newQtyStr);

  let updateObject = {};

  if (newlocation !== null) {
    updateObject["location"] = newlocation;
  }

  if (newQtyStr !== null) {
    updateObject["quantity"] = newQty;
  }

  try {
    const response = await axios.patch(
      `http://172.16.3.76:8888/updateitem/${itemId}`,
      updateObject,

      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response) return;

    setSearchResults((prevSearchResults) => {
      return prevSearchResults.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQty,
          };
        }
        return item;
      });
    });
    setNewQty(0);
  } catch (error) {
    console.error("Error updating item:", error);
    // Handle errors if needed
  }
};

const Search = () => {
  const [newQty, setNewQty] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [query, setQuery] = useState("");

  const handleQtyChange = (event) => {
    setNewQty(event.target.value);
  };

  const handleLocationSwitch = (itemId, event) => {
    handleEdit(itemId, setSearchResults, setNewQty, event.target.value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;

    setLocation(value);
  };

  const formattedExpiry = (expiry) => {
    const isDefaultTime = expiry === "0001-01-01T00:00:00Z";

    if (isDefaultTime) return "none";

    const date = new Date(expiry);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(2);

    return `${month}/${day}/${year}`;
  };

  const handleSearchInputChange = debounce((event) => {
    const value = event.target.value;
    setQuery(value);
  }, 800);

  useEffect(() => {
    processSearch(query, category, location, setSearchResults);
  }, [query, category, location]);

  return (
    <div className="search-container">
      <div className="search-results">
        {searchResults === null ? (
          <div className="no-items-found text-black dark:text-gray-900">
            <h1>No items found. please adjust your filters.</h1>
          </div>
        ) : (
          searchResults.map((item) => (
            <div
              className="card-full"
              key={item.id}
              style={{
                backgroundColor:
                  item.status === 2
                    ? "rgba(27, 153, 139, 0.3)"
                    : item.status === 1
                    ? "rgba(253, 202, 64, 0.6)"
                    : item.status === 0
                    ? "rgba(223, 41, 53, 0.35)"
                    : "rgba(71, 41, 41, 0.1)",
              }}
            >
              <div className="card">
                <div className="item-name">
                  <p className="card-min-location">
                    <select
                      name="location-select"
                      id="choose-location"
                      defaultValue={item.location}
                      onChange={(event) => handleLocationSwitch(item.id, event)}
                      className="bg-white dark:bg-gray-700 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700  shadow-sm rounded-md"
                    >
                      <option value="kitchen">kitchen</option>
                      <option value="fridge">fridge</option>
                      <option value="guest_room">guest room</option>
                      <option value="pantry">pantry</option>
                      <option value="closet">closet</option>
                    </select>
                  </p>
                  <h1 className="card-heading text-black dark:text-white">
                    {item.name}
                  </h1>
                  <p className="card-min-location text-gray-800 dark:text-white">
                    {"exp. "}
                    {formattedExpiry(item.expiry)}
                  </p>
                </div>
                <div className="edit-qty">
                  <div className="qty-text">
                    <p className="card-min-unit text-gray-800 dark:text-white font-semibold">
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
                      className="qty-input text-sm border border-gray-300 rounded-lg dark:text-white dark:bg-gray-700 dark:border-gray-700"
                      size="2"
                      onChange={handleQtyChange}
                    ></input>
                    <button
                      type="button"
                      className="edit-btn  text-white dark:text-gray-900"
                      onClick={() =>
                        handleEdit(item.id, setSearchResults, setNewQty, null, newQty)
                      }
                    >
                      <span>
                        <AiFillEdit size={17} />
                      </span>
                    </button>
                  </form>
                </div>
                <div className="delete">
                  <button
                    type="submit"
                    id="delete"
                    className="delete-btn bg-red-600 text-white dark:text-gray-900"
                    onClick={() => handleDelete(item.id, setSearchResults)}
                  >
                    <span>
                      <AiFillDelete size={18} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="search-div">
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="filter-opt">
            <select
              name="category"
              className="dropdown bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-700  shadow-sm rounded-md text-center"
              onChange={handleCategoryChange}
              defaultValue="all"
            >
              <option value="all">all categories</option>
              <option value="nuts">nuts</option>
              <option value="dals">dals</option>
              <option value="condiments">condiments</option>
              <option value="spices">spices</option>
              <option value="fruit">fruit</option>
              <option value="snacks">snacks</option>
              <option value="oils">oils</option>
              <option value="pantry_items">pantry items</option>
              <option value="other">other</option>
              <option value="fridge">fridge</option>
            </select>
            <select
              name="location"
              className="dropdown bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-700  shadow-sm rounded-md text-center"
              onChange={handleLocationChange}
              defaultValue="all"
            >
              <option value="all">all places</option>
              <option value="kitchen">kitchen</option>
              <option value="fridge">fridge</option>
              <option value="guest_room">guest room</option>
              <option value="pantry">pantry</option>
              <option value="closet">closet</option>
            </select>
          </div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-black sr-only dark:text-white"
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
              className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search items, categories, ..."
              onChange={handleSearchInputChange}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;

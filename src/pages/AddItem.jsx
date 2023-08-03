import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItem = () => {
  const success = () => toast.success("Item added");
  const failure = () => toast.error("Failed to add item.");
  const [category, setcategory] = useState("");

  const handleCategoryChange = (event) => {
    setcategory(event.target.value);
  };

  const insertitem = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const qty = formData.get("quantity");
    const unit = formData.get("unit");
    const location = formData.get("location");
    const category = formData.get("category");
    let expiry = formData.get("expiry");

    if (expiry !== null) {
      expiry = new Date(expiry);
    }

    const data = {
      name: name,
      quantity: parseInt(qty),
      unit: unit,
      location: location,
      category: category,
      expiry: expiry,
    };

    console.log(JSON.stringify(data));
    axios
      .post("http://172.16.3.76:8888/insert", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        success();
        event.target.reset();
        setcategory("nuts");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        failure();
      });
  };

  return (
    <div className="flex flex-col h-screen dark:text-white">
      <div>
        <h1 className="heading mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center mx-auto dark:text-teal-400">
          Add Items
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow w-72 mx-auto ">
        <form
          className="form-div flex flex-col items-center gap-4"
          onSubmit={insertitem}
        >
          <label
            htmlFor="itemName"
            className="text-gray-700 font-semibold dark:text-teal-100"
          >
            Item Name
          </label>
          <input
            id="itemName"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500 text-sm dark:text-white dark:bg-gray-800 dark:border-gray-700"
            type="text"
            placeholder="Enter item name"
            name="name"
            autoComplete="off"
            required
          />

          <label
            htmlFor="quantity"
            className="text-gray-700 font-semibold dark:text-teal-100"
          >
            Quantity
          </label>
          <div className="flex items-center">
            <input
              id="quantity"
              className="w-1/2 py-2 rounded-md dark:bg-gray-800 dark:text-white text-center focus:border-teal-500"
              type="number"
              placeholder="Qty"
              name="quantity"
              autoComplete="off"
              required
            />
            <select
              id="unit"
              className="w-1/2 py-2 rounded-md dark:bg-gray-800 dark:text-white text-center focus:border-teal-500"
              name="unit"
              required
            >
              <optgroup label="General">
                <option value="percentage">percent</option>
                <option value="numItems"># of items</option>
              </optgroup>
              <optgroup label="Units">
                <option value="pounds">pounds</option>
                <option value="oz">oz</option>
                <option value="cups">cups</option>
                <option value="grams">grams</option>
              </optgroup>
            </select>
          </div>

          <label
            htmlFor="location"
            className="text-gray-700 font-semibold dark:text-teal-100"
          >
            Location
          </label>
          <select
            id="location"
            className="w-full px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white focus:border-teal-500"
            name="location"
          >
            <option value="" disabled selected>
              Location
            </option>
            <option value="kitchen">kitchen</option>
            <option value="fridge">fridge</option>
            <option value="guest_room">guest room</option>
            <option value="pantry">pantry</option>
            <option value="closet">closet</option>
          </select>

          <label
            htmlFor="category"
            className="text-gray-700 font-semibold dark:text-teal-100 "
          >
            Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white focus:border-teal-500"
            onChange={handleCategoryChange}
            name="category"
          >
            <option value="" disabled selected>
              Category
            </option>
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

          {category === "fruit" ||
          category === "snacks" ||
          category === "condiments" ||
          category === "pantry_items" ? (
            <>
              <label htmlFor="date" className="text-gray-700 font-semibold">
                Expiration Date
              </label>
              <input
                id="date"
                name="expiry"
                type="date"
                className="w-full px-4 py-2 rounded-md focus:border-teal-500"
                min={new Date().toISOString().split("T")[0]}
              />
            </>
          ) : null}

          <button
            type="submit"
            className="bg-teal-900 text-white dark font-bold py-2 px-4 rounded"
          >
            Add Item
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} closeOnClick />
    </div>
  );
};

export default AddItem;

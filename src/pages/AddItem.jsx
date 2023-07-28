import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const AddItem = () => {
  const success = () => toast.success("Item added")
  const failure = () => toast.error("Failed to add item.")
  const [category, setcategory] = useState("")

  const handleCategoryChange = (event) => {
    setcategory(event.target.value)
  }

  const insertitem = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get("name")
    const qty = formData.get("quantity")
    const unit = formData.get("unit")
    const location = formData.get("location")
    const category = formData.get("category")
    const expiry = formData.get("expiry")
    
    const data = {
      name: name,
      quantity: parseInt(qty),
      unit: unit,
      location: location,
      category: category,
      expiry: expiry,
    };

    console.log(JSON.stringify(data))

    axios
      .post("http://localhost:8080/insert", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        success()
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        failure()
      });
  }

  return (
    <div className="flex flex-col h-screen">
      <div>
        <h1 className="heading mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center mx-auto">
          Add Items
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow w-72 mx-auto">
        <form
          className="form-div flex flex-col items-center gap-4"
          onSubmit={insertitem}
        >
          <label htmlFor="itemName" className="text-gray-700 font-semibold">
            Item Name
          </label>
          <input
            id="itemName"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter item name"
            name="name"
            autoComplete="off"
            required
          />

          <label htmlFor="quantity" className="text-gray-700 font-semibold">
            Quantity
          </label>
          <div className="flex items-center">
            <input
              id="quantity"
              className="w-1/2 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500"
              type="number"
              placeholder="Qty"
              name="quantity"
              autoComplete="off"
              required
            />
            <select
              id="unit"
              className="w-1/2 px-4 py-2 rounded-r-md border border-l-0 border-gray-300 focus:outline-none focus:border-blue-500"
              name="unit"
              required
            >
              <option value="" disabled selected>
                Unit
              </option>
              <option value="percentage">percent</option>
              <option value="pounds">pounds</option>
              <option value="numItems"># of items</option>
            </select>
          </div>

          <label htmlFor="location" className="text-gray-700 font-semibold">
            Location
          </label>
          <select
            id="location"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
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

          <label htmlFor="category" className="text-gray-700 font-semibold">
            Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleCategoryChange}
            name="category"
            required
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
          </select>

          {category === "fruit" ||
          category === "snacks" ||
          category === "pantry_items" ? (
            <>
              <label htmlFor="date" className="text-gray-700 font-semibold">
                Expiration Date
              </label>
              <input
                id="date"
                name="expiry"
                type="date"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                min={new Date().toISOString().split("T")[0]}
              />
            </>
          ) : null}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </form>
      </div>
      <ToastContainer 
      position="top-center"
      autoClose={2000}
      closeOnClick
      />
    </div>
  );
};

export default AddItem;

const AddItem = () => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <h1 className="heading mb-4 mt-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center mx-auto">
          Add Items
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow w-72 mx-auto">
        <form className="form-div flex flex-col items-center gap-4">
          <label htmlFor="itemName" className="text-gray-700 font-semibold">
            Item Name
          </label>
          <input
            id="itemName"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter item name"
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
            />
            <select
              id="unit"
              className="w-1/2 px-4 py-2 rounded-r-md border border-l-0 border-gray-300 focus:outline-none focus:border-blue-500"
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
          >
            <option value="" disabled selected>
              Category
            </option>
            <option value="nuts">nuts</option>
            <option value="dals">dals</option>
            <option value="condiments">condiments</option>
            <option value="spices">spices</option>
            <option value="fruits">fruits</option>
            <option value="snacks">snacks</option>
            <option value="oils">oils</option>
            <option value="pantry_items">pantry items</option>
            <option value="other">other</option>
          </select>

          <label htmlFor="date" className="text-gray-700 font-semibold">
            Expiration Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
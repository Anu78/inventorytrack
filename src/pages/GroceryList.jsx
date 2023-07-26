const GroceryList = () => {
  return (
    <div className="grocery-container">
      <div className="list-heading">
        <h1>Grocery List</h1>
      </div>

      <div className="list">
        <ul className="list-none space-y-2 text-gray-800">
          <li className="bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            Item 1
          </li>
          <li className="bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            Item 2
          </li>
          <li className="bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            Item 3
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroceryList;

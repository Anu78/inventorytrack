import { useState, useEffect } from "react";
import axios from "axios";

const GroceryList = () => {
  
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8888/expiringsoon")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <div className="grocery-container">
      <div className="list-heading">
        <h1>Grocery List</h1>
      </div>

      <div className="list">
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </div>
    </div>
  );
};

export default GroceryList;

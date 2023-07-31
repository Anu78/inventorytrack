import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);

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
    <div className="expiry-container">
      <div className="expiry-heading">
        <h1 className="">Home - items expiring soon:</h1>
      </div>

      <div className="list">
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import axios from "axios";

const apiEndpoint = import.meta.env.DEV
  ? import.meta.env.VITE_API_ENDPOINT_LOCAL
  : import.meta.env.VITE_API_ENDPOINT_PROD;

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(apiEndpoint + "/expiringsoon")
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

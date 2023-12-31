import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AddItem from "./pages/AddItem";
import GroceryList from "./pages/GroceryList";
import Home from "./pages/Home";
import Search from "./pages/Search";
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/list" element={<GroceryList />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

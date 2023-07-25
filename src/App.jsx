import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import AddItem from "./pages/AddItem"
import GroceryList from "./pages/GroceryList"
import Home from "./pages/Home"
function App() {

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/list" element={<GroceryList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

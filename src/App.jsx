import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import AddItem from "./pages/AddItem"
import GroceryList from "./pages/GroceryList"
import Home from "./pages/Home"
function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/list" element={<GroceryList />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App

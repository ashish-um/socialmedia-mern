import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import Create from "./pages/Create";
import Saved from "./pages/Saved";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

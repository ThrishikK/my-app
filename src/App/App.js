import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recursion from "../Recursion/Recursion";
import Carousel from "../SlidingWindow/SlidingWindow";
import "./App.css";
import PageNav from "../PageNav/PageNav";

function App() {
  return (
    <BrowserRouter basename="/my-app">
      <Routes>
        <Route index element={<PageNav />} />
        <Route path="/recursion" element={<Recursion />} />
        <Route path="/window" element={<Carousel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Credits from "./pages/Credits";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} /> 
      </Routes>
      <Footer />
    </>
  );
}

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StyleProvider from "./styles/StyleProvider";
import { useContentConfig } from "./hooks/useContentConfig";

import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Credits from "./pages/Credits";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

export default function AppWrapper() {
  const { config } = useContentConfig();
  
  // Provide default values if config not loaded yet
  const stylePreset = config?.stylePreset || 'classic';
  const colors = config?.colors || {};

  return (
    <StyleProvider stylePreset={stylePreset} colors={colors}>
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
    </StyleProvider>
  );
}


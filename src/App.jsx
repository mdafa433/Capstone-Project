import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Indonesia from "./pages/Indonesia";
import Programming from "./pages/Programming";
import Covid from "./pages/Covid";
import LatestNews from "./pages/LatestNews";
import Saved from "./pages/Saved";
import Search from "./pages/Search";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/LatestNews" />} />
        <Route path="/LatestNews" element={<LatestNews />} />
        <Route path="/indonesia" element={<Indonesia />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/Covid" element={<Covid />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

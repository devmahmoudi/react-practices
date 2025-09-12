import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

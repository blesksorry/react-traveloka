import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Pages1 from "./pages/pages1";
import Product from "./pages/product";
import Contact from "./pages/contact";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
const queryClient = new QueryClient();


function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Pages1 />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
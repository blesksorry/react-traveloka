import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import ConnectSection from "../components/ConnectSection";
import SearchAttractions from "../components/SearchAttractions";

function Product() {
  return (
    <div className='App'>
      <Header />
      <ConnectSection />
      <SearchAttractions />
      <Footer />
    </div>
  );
}

export default Product;
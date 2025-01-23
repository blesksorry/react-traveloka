import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import ProductSection from "../components/ProductSection";
import MouseTracker from "../components/MouseTracker";
import ScrollTracker from "../components/ScrollTracker";


function Pages1() {
  return (
    <div className='App'>
          <MouseTracker />
          <ScrollTracker />
          <Header />
          <MainSection />
          <ProductSection />
          <Footer />

    </div>
  );
}

export default Pages1;
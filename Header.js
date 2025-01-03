import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold text-blue-600">BestSalesCoach</h1>
        <nav className="space-x-6">
          <a href="#home" className="text-gray-700">Home</a>
          <a href="#product" className="text-gray-700">Product</a>
          <a href="#use-cases" className="text-gray-700">Use Cases</a>
          <a href="#about" className="text-gray-700">About Us</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Book a Demo</button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Empower Your Business with Cloud & Data Solutions
          </h1>
          <p className="text-gray-200 text-lg mb-6 max-w-2xl">
            Modernizing infrastructure, optimizing data workflows, and delivering scalable applications.
          </p>
          <a href="/contact" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-teal-700">
            Get in Touch
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Who We Are</h2>
        <p className="text-secondary">
          NSBTEK Solutions helps businesses achieve digital transformation with cloud and data solutions.
        </p>
      </div>
    </>
  )
}

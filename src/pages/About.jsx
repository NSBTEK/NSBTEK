import React from "react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">About Us</h2>
      <img src="/about-team.jpg" alt="Our Team" className="w-full h-64 object-cover rounded shadow mb-4" />
      <p className="text-secondary">
        We are a team of cloud and data professionals dedicated to helping businesses scale efficiently and securely.
      </p>
    </div>
  )
}

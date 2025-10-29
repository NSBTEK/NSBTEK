import React from "react";

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
      <img src="/contact-office.jpg" alt="Office" className="w-full h-64 object-cover rounded shadow mb-4" />
      <p className="text-secondary mb-6">
        Reach out to us for cloud and data solutions that grow your business.
      </p>
      <a href="mailto:nsbtek@gmail.com" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-teal-700">
        Email Us
      </a>
    </div>
  )
}

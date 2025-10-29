import React from "react";

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <img src="/service-cloud.jpg" alt="Cloud Service" className="w-full h-40 object-cover rounded" />
          <h3 className="mt-2 font-bold text-xl">Cloud Infrastructure</h3>
          <p className="mt-1 text-secondary">
            Cloud migration, optimization, and management for scalable business solutions.
          </p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <img src="/service-data.jpg" alt="Data Service" className="w-full h-40 object-cover rounded" />
          <h3 className="mt-2 font-bold text-xl">Data Engineering</h3>
          <p className="mt-1 text-secondary">
            ETL pipelines, data analysis, and actionable insights for better decision-making.
          </p>
        </div>
      </div>
    </div>
  )
}

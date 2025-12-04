export default function Services() {
  return (
    <div className="mt-28 space-y-24 px-6 md:px-16">

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Our IT Services
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Comprehensive solutions designed to accelerate business growth, optimize operations, and empower your teams.
        </p>
        <a 
          href="/contact" 
          className="bg-white text-primary px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-200 transition"
        >
          Get a Free Consultation
        </a>
      </section>

      {/* Service Categories */}
      <section className="space-y-16">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">IT Consulting</h3>
            <p>
              Tailored strategies to optimize your technology infrastructure, improve business operations, and achieve measurable results.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Staffing Solutions</h3>
            <p>
              Access a network of skilled IT professionals ready to join your team and drive impactful results.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Cloud & DevOps</h3>
            <p>
              Implement scalable cloud solutions and DevOps practices to accelerate development cycles and improve operational efficiency.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Cybersecurity & Data Analytics</h3>
            <p>
              Protect your data, ensure compliance, and leverage analytics to make smarter, data-driven decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Studies / Testimonials */}
      <section className="space-y-12">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">Client Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-lightblue p-6 rounded-lg shadow-md">
            <p className="italic mb-4">
              "NSBTEK helped us transition to a cloud-first environment with minimal disruption. Their expertise and responsiveness were exceptional."
            </p>
            <p className="font-semibold">– Sarah Williams, CTO, TechCorp</p>
          </div>
          <div className="bg-lightblue p-6 rounded-lg shadow-md">
            <p className="italic mb-4">
              "Their staffing solutions brought top IT talent to our team, enabling us to complete critical projects on time and under budget."
            </p>
            <p className="font-semibold">– David Lee, VP of Operations, FinServe</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-primary text-white rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Elevate Your IT Strategy?
        </h2>
        <p className="text-lg mb-6">
          Partner with NSBTEK to implement tailored solutions that drive real business impact.
        </p>
        <a 
          href="/contact" 
          className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Schedule Your Consultation
        </a>
      </section>

    </div>
  );
}

export default function About() {
  return (
    <div className="mt-28 space-y-24 px-6 md:px-16">

      {/* Hero Section */}
      <section className="text-center py-20 bg-lightblue rounded-lg shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
          Empowering Businesses with Expert IT Solutions
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          At NSBTEK, we combine innovative technology with top-tier talent to help organizations achieve digital excellence.
        </p>
        <a 
          href="/contact" 
          className="bg-primary text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </section>

      {/* Our Story */}
      <section className="space-y-10">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">Our Story</h2>
        <div className="max-w-5xl mx-auto space-y-6 text-center text-lg">
          <p>
            Founded with a vision to bridge the gap between businesses and technology talent, NSBTEK has grown into a trusted IT consulting and staffing partner. 
          </p>
          <p>
            Over the years, we have helped companies of all sizes streamline operations, implement cutting-edge technology solutions, and achieve measurable results.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="space-y-10">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p>
              Deliver innovative IT solutions and connect businesses with the right talent to drive growth, efficiency, and digital transformation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p>
              To be the most trusted IT consulting and staffing partner, recognized for excellence, innovation, and long-term client success.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="space-y-10">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">Meet Our Leadership</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/images/ceo.jpg" alt="CEO" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
            <h3 className="text-xl font-semibold mb-2">Naveen Sandra</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/images/cto.jpg" alt="CTO" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
            <h3 className="text-xl font-semibold mb-2">Diwakar Sandra</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/images/coo.jpg" alt="COO" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
            <h3 className="text-xl font-semibold mb-2">Manish Sandra</h3>
            <p className="text-gray-600">Chief Operations Officer</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-primary text-white rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Partner with NSBTEK?
        </h2>
        <p className="text-lg mb-6">
          Let’s work together to transform your IT strategy and business growth.
        </p>
        <a 
          href="/contact" 
          className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Contact Us Today
        </a>
      </section>

    </div>
  );
}

export default function Home() {
  return (
    <div className="mt-28 space-y-20 px-6 md:px-16">

      {/* Hero Section */}
      <section className="text-center py-16 bg-lightblue rounded-lg shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
          Powering Your Business with Top IT Talent & Innovative Solutions
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          We connect organizations with skilled IT professionals and deliver consulting solutions that drive growth, efficiency, and digital transformation.
        </p>
        <a 
          href="/contact" 
          className="bg-primary text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-700 transition"
        >
          Get Started | Contact Us
        </a>
      </section>

      {/* Our Services */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">IT Consulting</h3>
            <p>Tailored strategies to optimize your technology, improve operations, and accelerate business growth.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Staffing Solutions</h3>
            <p>Access highly skilled IT professionals ready to join your team and drive results.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Cloud & DevOps</h3>
            <p>Seamless cloud solutions and DevOps practices for modern, scalable businesses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Cybersecurity & Data Analytics</h3>
            <p>Protect your data and unlock actionable insights to make smarter decisions.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a 
            href="/services" 
            className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Explore Services
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">Why Choose NSBTEK?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Expert Talent Network</h3>
            <p>Experienced IT professionals across multiple industries.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Customized Solutions</h3>
            <p>Solutions designed to fit your unique business needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
            <p>Successful projects delivered with measurable outcomes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Trusted Partnership</h3>
            <p>Long-term relationships built on integrity and excellence.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a 
            href="/contact" 
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Partner With Us
          </a>
        </div>
      </section>

      {/* About Us */}
      <section className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-primary">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg">
          We are an IT consulting and staffing firm dedicated to helping businesses thrive in the digital era. 
          From delivering strategic IT solutions to connecting you with the right talent, we turn your challenges into opportunities.
        </p>
        <a 
          href="/about" 
          className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
        >
          Learn More About Us
        </a>
      </section>

      {/* Footer / Contact CTA */}
      <section className="bg-primary text-white py-16 text-center rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to transform your IT strategy and team?
        </h2>
        <p className="text-lg mb-6">
          Contact us today to discover how we can help your business grow.
        </p>
        <a 
          href="/contact" 
          className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Get in Touch
        </a>
      </section>

    </div>
  );
}
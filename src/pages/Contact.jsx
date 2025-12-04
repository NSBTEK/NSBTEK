export default function Contact() {
  return (
    <div className="mt-28 space-y-24 px-6 md:px-16">

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Let’s Connect
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Have questions or ready to get started? Reach out to our team and we’ll help you transform your IT strategy.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-primary">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea 
                placeholder="Your Message" 
                rows="5" 
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-lightblue p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Office Location</h3>
            <p>Randall Dr, Monmouth Jct, NJ 08852</p>
          </div>
          <div className="bg-lightblue p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Phone & Email</h3>
            <p>Phone: (612) 567-0908<br/>Email: nsbtek@gmail.com</p>
          </div>
          <div className="bg-lightblue p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <p>LinkedIn | Twitter | Facebook</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-md">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.123456789!2d-74.00594118459362!3d40.712775179331954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sNSBTEK%20Office!5e0!3m2!1sen!2sus!4v1234567890" 
          width="100%" 
          height="400" 
          className="border-0" 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Bottom Call to Action */}
      <section className="text-center py-16 bg-primary text-white rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Have Questions or Need Support?
        </h2>
        <p className="text-lg mb-6">
          Our team is ready to help your business succeed with IT solutions that work.
        </p>
        <a 
          href="/contact" 
          className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Reach Out Today
        </a>
      </section>

    </div>
  );
}

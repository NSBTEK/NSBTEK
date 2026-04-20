import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <img src="/Logo.png" alt="NSBTEK Logo" style={{height: 48}} />
          <p className="mt-4 text-sm text-white/90 max-w-sm">
            NSBTEK Solutions — powering businesses with top IT talent and innovative solutions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm">Email: <a href="mailto:nsbtek@gmail.com" className="underline">nsbtek@gmail.com</a></p>
          <p className="text-sm mt-2">Phone: +1 (612) 567-0908</p>

          <div className="mt-6">
            <Link to="/contact" className="inline-block bg-white text-primary px-5 py-2 rounded-md font-medium hover:bg-white/90">Get in Touch</Link>
          </div>
        </div>
      </div>

      <div className="bg-primary/90 border-t border-primary/70 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-sm text-white/70">
          © {new Date().getFullYear()} NSBTEK Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
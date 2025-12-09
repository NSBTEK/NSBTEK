import { Link } from "react-router-dom";

export default function Header() {
  return (
   <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="NSBTEK Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-primary">NSBTEK Solutions</h1>
        </div>
        <nav className="flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-accent text-text-main">Home</Link>
          <Link to="/about" className="hover:text-accent">About</Link>
          <Link to="/services" className="hover:text-accent">Services</Link>
          <Link to="/contact" className="hover:text-accent">Contact</Link>
          <a href="mailto:nsbtek@gmail.com" className="ml-4 inline-block bg-accent text-white px-4 py-2 rounded-md shadow-sm hover:opacity-95">
            Get in Touch
          </a>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer px-3 py-2 rounded-md bg-white border border-outline">Menu</summary>
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-soft-lg p-3 space-y-2">
              <Link to="/" className="block py-1 px-2 rounded hover:bg-light text-text-main">Home</Link>
              <Link to="/about" className="block py-1 px-2 rounded hover:bg-light text-text-main">About</Link>
              <Link to="/services" className="block py-1 px-2 rounded hover:bg-light text-text-main">Services</Link>
              <Link to="/contact" className="block py-1 px-2 rounded hover:bg-light text-text-main">Contact</Link>
              <a href="mailto:nsbtek@gmail.com" className="block py-1 px-2 rounded bg-accent text-white text-center">Get in Touch</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

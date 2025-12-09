import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur header-height shadow-sm border-b border-outline">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-6 md:px-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/Logo.png" alt="NSBTEK Logo" style={{height: 55}} className="object-contain" />
            <span className="text-primary text-lg font-semibold">NSBTEK Solutions</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-soft">
          <Link to="/" className="hover:text-accent text-text-main">Home</Link>
          <Link to="/about" className="hover:text-accent">About</Link>
          <Link to="/services" className="hover:text-accent">Services</Link>
          <Link to="/contact" className="hover:text-accent">Contact</Link>
          <a href="mailto:nsbtek@gmail.com" className="ml-4 inline-block bg-accent text-white px-4 py-2 rounded-md shadow-sm hover:opacity-95">Get in Touch</a>
        </nav>

        {/* Mobile: simple menu button linking to hash routes via anchors */}
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
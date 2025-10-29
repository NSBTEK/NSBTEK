import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* Navigation links */}
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/services" className="hover:underline">Services</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
    </nav>
  )
}

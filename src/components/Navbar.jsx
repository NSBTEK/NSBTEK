import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="NSBTEK Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-primary">NSBTEK Solutions</h1>
        </div>
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/services" className="hover:text-primary">Services</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

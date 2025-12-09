import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="NSBTEK Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-primary">NSBTEK Solutions</h1>
        </div>
        <nav className="flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/services" className="hover:text-primary">Services</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
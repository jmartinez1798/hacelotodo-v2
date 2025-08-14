import { Link, useLocation } from "wouter";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Logo size={20} />
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/explore" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location === '/explore' 
                    ? 'text-primary-600' 
                    : 'text-slate-600 hover:text-primary-600'
                }`}
              >
                Explorar
              </Link>
              <Link 
                href="/#como-funciona" 
                className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                ¿Cómo funciona?
              </Link>
              <Link 
                href="/categoria/hogar" 
                className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Hogar
              </Link>
              <Link 
                href="/categoria/belleza" 
                className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Belleza
              </Link>
              <Link 
                href="/provider" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Publicar servicio
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-slate-600 hover:text-primary-600 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200">
              <Link 
                href="/explore" 
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link 
                href="/#como-funciona" 
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                ¿Cómo funciona?
              </Link>
              <Link 
                href="/provider" 
                className="block px-3 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Publicar servicio
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onPost?: () => void;
}

export default function Header({ onPost }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/explore", label: "Explorar" },
    { href: "/categoria/hogar", label: "Hogar" },
    { href: "/categoria/belleza", label: "Belleza" },
    { href: "/categoria/tecnologia", label: "Tecnología" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Hacelotodo — Inicio">
            <Logo size={20} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location === link.href 
                    ? "text-blue-600" 
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/provider'}
            >
              ¿Eres proveedor?
            </Button>
            <Button 
              size="sm"
              onClick={onPost || (() => window.location.href = '/provider')}
              data-testid="button-header-publish"
            >
              Publicar servicio
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location === link.href 
                      ? "text-blue-600" 
                      : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    window.location.href = '/provider';
                    setMobileMenuOpen(false);
                  }}
                >
                  ¿Eres proveedor?
                </Button>
                <Button 
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    onPost ? onPost() : window.location.href = '/provider';
                    setMobileMenuOpen(false);
                  }}
                >
                  Publicar servicio
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
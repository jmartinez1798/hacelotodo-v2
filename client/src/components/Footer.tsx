import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              Hacelotodo<span className="text-slate-400">.com</span>
            </div>
            <p className="text-slate-400 mb-4">
              La plataforma que conecta clientes con profesionales verificados de confianza.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Para clientes</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explorar servicios</Link></li>
              <li><Link href="/#como-funciona" className="hover:text-white transition-colors">Cómo funciona</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Garantías</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Para profesionales</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/provider" className="hover:text-white transition-colors">Únete como profesional</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Herramientas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">© {currentYear} Hacelotodo.com. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Política de cookies</a>
            <a href="#" className="hover:text-white transition-colors">Aviso legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

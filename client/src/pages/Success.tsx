import { Link } from "wouter";

export default function Success() {
  return (
    <main className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-3xl text-emerald-600"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">¡Reserva confirmada!</h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Tu reserva ha sido procesada exitosamente. Recibirás un email de confirmación con todos los detalles.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">¿Qué sigue?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary-600 mr-3"></i>
                <span className="text-slate-700">Te enviaremos un email de confirmación</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-primary-600 mr-3"></i>
                <span className="text-slate-700">El profesional te contactará para confirmar detalles</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-calendar-check text-primary-600 mr-3"></i>
                <span className="text-slate-700">Disfruta tu servicio en la fecha acordada</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/explore" className="flex-1">
              <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                Explorar más servicios
              </button>
            </Link>
            
            <Link href="/" className="flex-1">
              <button className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-300 transition-colors">
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

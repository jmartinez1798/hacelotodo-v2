import { Link } from "wouter";

export default function Cancel() {
  return (
    <main className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-times text-3xl text-red-600"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Reserva cancelada</h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Tu reserva ha sido cancelada. No se ha realizado ningún cargo.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">¿Necesitas ayuda?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <i className="fas fa-search text-primary-600 mr-3"></i>
                <span className="text-slate-700">Explora otros servicios disponibles</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-headset text-primary-600 mr-3"></i>
                <span className="text-slate-700">Contacta nuestro equipo de soporte</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-question-circle text-primary-600 mr-3"></i>
                <span className="text-slate-700">Consulta nuestras preguntas frecuentes</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/explore" className="flex-1">
              <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                Buscar servicios
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

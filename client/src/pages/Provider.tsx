import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Provider() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    city: "",
    description: "",
    experience: "",
    price: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('provider-draft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('provider-draft', JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario borrador guardado en localStorage. En una implementación real, esto se enviaría al servidor.');
  };

  const clearDraft = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      city: "",
      description: "",
      experience: "",
      price: "",
    });
    localStorage.removeItem('provider-draft');
  };

  return (
    <main className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Crear perfil de proveedor</h1>
          <p className="text-xl text-slate-600">
            Completa tu perfil para empezar a recibir solicitudes de clientes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Información básica</h2>
              <button 
                onClick={clearDraft}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Limpiar borrador
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Tu información se guarda automáticamente mientras completas el formulario
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre completo *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ciudad *</label>
                <select 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecciona tu ciudad</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Barcelona">Barcelona</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Sevilla">Sevilla</option>
                  <option value="Bilbao">Bilbao</option>
                  <option value="Zaragoza">Zaragoza</option>
                  <option value="Granada">Granada</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categoría de servicio *</label>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Selecciona una categoría</option>
                <option value="hogar">Servicios del hogar</option>
                <option value="belleza">Belleza y cuidado personal</option>
                <option value="tecnologia">Tecnología y reparaciones</option>
                <option value="eventos">Eventos y entretenimiento</option>
                <option value="mascotas">Cuidado de mascotas</option>
                <option value="fitness">Fitness y bienestar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Precio por hora (€) *</label>
              <input 
                type="number" 
                required
                min="1"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                placeholder="25.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Años de experiencia *</label>
              <select 
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Selecciona tu experiencia</option>
                <option value="Menos de 1 año">Menos de 1 año</option>
                <option value="1-3 años">1-3 años</option>
                <option value="3-5 años">3-5 años</option>
                <option value="5-10 años">5-10 años</option>
                <option value="Más de 10 años">Más de 10 años</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Descripción de tus servicios *</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                placeholder="Describe tu experiencia, especialidades y qué puedes ofrecer a tus clientes..."
              />
            </div>

            <div className="bg-primary-50 rounded-lg p-4">
              <h3 className="font-semibold text-primary-900 mb-2">💡 Consejos para tu perfil</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Sé específico sobre tus habilidades y experiencia</li>
                <li>• Menciona cualquier certificación o formación relevante</li>
                <li>• Incluye ejemplos de trabajos anteriores si es posible</li>
                <li>• Mantén un precio competitivo pero justo para tu experiencia</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Guardar borrador
              </button>
              
              <Link href="/" className="flex-1">
                <button 
                  type="button"
                  className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
                >
                  Volver al inicio
                </button>
              </Link>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Este es un formulario de borrador. En la versión final, podrás enviar tu perfil para revisión y activación.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

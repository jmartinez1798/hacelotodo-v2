import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import CategoryCard from "@/components/CategoryCard";
import ServiceCard from "@/components/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";

const categories = [
  { name: "Hogar", icon: "fas fa-home", slug: "hogar" },
  { name: "Belleza", icon: "fas fa-cut", slug: "belleza" },
  { name: "Tecnología", icon: "fas fa-laptop", slug: "tecnologia" },
  { name: "Eventos", icon: "fas fa-birthday-cake", slug: "eventos" },
  { name: "Mascotas", icon: "fas fa-paw", slug: "mascotas" },
  { name: "Fitness", icon: "fas fa-dumbbell", slug: "fitness" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
  });
  const { toast } = useToast();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const featuredServices = services.filter(service => service.featured).slice(0, 4);

  const providerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
      
      if (formspreeId) {
        // Submit to Formspree
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit to Formspree');
        }
        
        return response.json();
      } else {
        // Submit to internal API
        return await apiRequest('POST', '/api/providers/pre-register', data);
      }
    },
    onSuccess: () => {
      toast({
        title: "¡Registro exitoso!",
        description: "Te contactaremos pronto para completar tu perfil.",
      });
      setFormData({ name: "", email: "", phone: "", category: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu registro. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.category) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    providerMutation.mutate(formData);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-slate-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
                Encuentra y reserva
                <span className="text-primary-600"> profesionales</span>
                en minutos
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                Conectamos a clientes con profesionales verificados. Publica tu servicio gratis y solo paga comisión por reserva confirmada.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/explore">
                  <button className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
                    Explorar servicios
                  </button>
                </Link>
                <Link href="/provider">
                  <button className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors">
                    Publicar servicio
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
                alt="Professional service worker" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Categorías populares</h2>
            <p className="mt-4 text-xl text-slate-600">Encuentra el profesional que necesitas</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.slug} 
                name={category.name} 
                icon={category.icon} 
                slug={category.slug} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Servicios destacados</h2>
            <p className="mt-4 text-xl text-slate-600">Los mejores profesionales de tu zona</p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded mb-3"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/explore">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                Ver todos los servicios
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Provider Registration Form */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
            <div className="lg:col-span-6 text-white">
              <h2 className="text-3xl font-bold sm:text-4xl">¿Eres profesional?</h2>
              <p className="mt-4 text-xl text-primary-100">
                Únete a nuestra plataforma y empieza a recibir clientes hoy mismo. 
                Registro gratuito, solo pagas comisión por reserva confirmada.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-emerald-300 mr-3"></i>
                  <span>Registro 100% gratuito</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-emerald-300 mr-3"></i>
                  <span>Solo 10% de comisión por reserva</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-emerald-300 mr-3"></i>
                  <span>Pagos semanales garantizados</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Únete como profesional</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de servicio *</label>
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
                  <button 
                    type="submit" 
                    disabled={providerMutation.isPending}
                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {providerMutation.isPending ? 'Enviando...' : 'Empezar ahora'}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    Al registrarte aceptas nuestros términos y condiciones
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white" id="como-funciona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">¿Cómo funciona?</h2>
            <p className="mt-4 text-xl text-slate-600">Simple, rápido y seguro</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Busca</h3>
              <p className="text-slate-600">Encuentra el profesional que necesitas en tu zona usando nuestros filtros de búsqueda.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-check text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2. Reserva</h3>
              <p className="text-slate-600">Selecciona fecha y hora disponible, completa tus datos y confirma la reserva.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Disfruta</h3>
              <p className="text-slate-600">Recibe el servicio profesional y valora tu experiencia para ayudar a otros usuarios.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@shared/schema";

const categories = [
  { name: "Todos", slug: "" },
  { name: "Hogar", slug: "hogar" },
  { name: "Belleza", slug: "belleza" },
  { name: "Tecnología", slug: "tecnologia" },
  { name: "Eventos", slug: "eventos" },
  { name: "Mascotas", slug: "mascotas" },
  { name: "Fitness", slug: "fitness" },
];

const cities = [
  "Todas las ciudades",
  "Madrid",
  "Barcelona", 
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Zaragoza",
  "Granada"
];

export default function Explore() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || '';
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      if (filters.category && service.category !== filters.category) return false;
      if (filters.city && filters.city !== "Todas las ciudades" && service.city !== filters.city) return false;
      if (filters.minPrice && parseFloat(service.price) < parseFloat(filters.minPrice)) return false;
      if (filters.maxPrice && parseFloat(service.price) > parseFloat(filters.maxPrice)) return false;
      return true;
    });
  }, [services, filters]);

  return (
    <main className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Explorar servicios</h1>
          <p className="text-xl text-slate-600">Encuentra el profesional perfecto para ti</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categoría</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.slug} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Ciudad</label>
              <select 
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Precio mínimo (€)</label>
              <input 
                type="number" 
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="0"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Precio máximo (€)</label>
              <input 
                type="number" 
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="200"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''} encontrado{filteredServices.length !== 1 ? 's' : ''}
            </p>
            <button 
              onClick={() => setFilters({ category: '', city: '', minPrice: '', maxPrice: '' })}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-search text-6xl text-slate-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No se encontraron servicios</h3>
            <p className="text-slate-600">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

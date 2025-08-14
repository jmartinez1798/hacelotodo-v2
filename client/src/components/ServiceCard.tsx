import { Link } from "wouter";
import { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const imageUrl = service.images && service.images.length > 0 
    ? service.images[0] 
    : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250";

  return (
    <Link href={`/perfil/${service.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={service.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {service.featured && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              DESTACADO
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg text-slate-900 mb-2">{service.title}</h3>
          <p className="text-slate-600 text-sm mb-3">{service.description}</p>
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <span className="ml-2 text-sm text-slate-600">{service.rating} (127)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary-600">${service.price}/hora</span>
            <span className="text-sm text-slate-500">{service.city}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

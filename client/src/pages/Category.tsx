import { useEffect, useState } from "react";
import { useParams } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import type { Service } from "../../../shared/schema";

const SLUG_MAP: Record<string, string> = {
  hogar: "hogar",
  belleza: "belleza", 
  tecnologia: "tecnologia",
  eventos: "eventos",
  mascotas: "mascotas",
  fitness: "fitness",
  limpieza: "hogar",
  plomeria: "hogar",
  electricidad: "hogar",
  jardineria: "hogar"
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  hogar: "Profesionales para tu hogar: limpieza, plomería, electricidad, jardinería y más",
  belleza: "Servicios de belleza y cuidado personal a domicilio",
  tecnologia: "Técnicos especializados en reparación y configuración tecnológica",
  eventos: "Organización profesional de eventos, bodas y celebraciones",
  mascotas: "Cuidado especializado para tus mascotas",
  fitness: "Entrenadores personales y servicios de fitness a domicilio"
};

export default function Category() {
  const { slug } = useParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = SLUG_MAP[slug || ""] || slug || "";
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const description = CATEGORY_DESCRIPTIONS[category] || `Servicios de ${categoryName} en Puerto Rico`;

  useEffect(() => {
    const loadCategoryServices = async () => {
      try {
        const response = await fetch(`/api/services?category=${encodeURIComponent(category)}`);
        const data = await response.json();
        const servicesList = Array.isArray(data) ? data : data.services || [];
        
        // Filter services by category
        const filteredServices = servicesList.filter((service: Service) => 
          service.category.toLowerCase() === category.toLowerCase()
        );
        
        setServices(filteredServices);
        
        // Dynamic SEO
        document.title = `Servicios de ${categoryName} — Hacelotodo.com`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', description);
        }
        
        // JSON-LD structured data for category page
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Servicios de ${categoryName}`,
          "description": description,
          "about": {
            "@type": "Thing",
            "name": categoryName
          },
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredServices.length,
            "itemListElement": filteredServices.slice(0, 10).map((service: Service, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "USD",
                  "price": service.price
                }
              }
            }))
          }
        };
        
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
        
      } catch (error) {
        console.error("Error loading category services:", error);
      }
      setLoading(false);
    };

    if (category) {
      loadCategoryServices();
    }
  }, [category, categoryName, description]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Servicios de {categoryName}
        </h1>
        <p className="text-gray-600 text-lg">
          {description}
        </p>
      </div>

      {services.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No hay servicios disponibles en esta categoría
          </h2>
          <p className="text-gray-600">
            Pronto tendremos más opciones disponibles. Mientras tanto, 
            puedes explorar otras categorías.
          </p>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MapPin, Calendar } from "lucide-react";

interface ProviderProfile {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  price: string;
  rating: string;
  featured: boolean;
  images: string[];
  createdAt: string;
  // Provider-specific fields
  provider_name?: string;
  provider_phone?: string;
  provider_city?: string;
  provider_rating?: string;
  reviews?: number;
}

interface BookingForm {
  name: string;
  phone: string;
  date: string;
  message: string;
}

export default function Profile() {
  const { id } = useParams();
  const [service, setService] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingForm>({
    name: "",
    phone: "",
    date: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadService = async () => {
      try {
        // For now, get service from our existing endpoint and simulate provider data
        const response = await fetch(`/api/services?id=${id}`);
        const data = await response.json();
        const services = Array.isArray(data) ? data : data.services || [];
        const foundService = services.find((s: any) => s.id === id);
        
        if (foundService) {
          // Simulate provider data based on service
          const providerProfile: ProviderProfile = {
            ...foundService,
            provider_name: `${foundService.title.split(' ')[0]} Profesional`,
            provider_phone: "787-555-0123",
            provider_city: foundService.city,
            provider_rating: foundService.rating,
            reviews: Math.floor(Math.random() * 50) + 10
          };
          
          setService(providerProfile);
          
          // Dynamic SEO
          document.title = `${foundService.title} — Hacelotodo.com`;
          
          // JSON-LD structured data
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": foundService.title,
            "description": foundService.description,
            "provider": {
              "@type": "Organization",
              "name": providerProfile.provider_name
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": foundService.price
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": foundService.rating,
              "reviewCount": providerProfile.reviews
            }
          };
          
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.text = JSON.stringify(structuredData);
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error("Error loading service:", error);
      }
      setLoading(false);
    };

    if (id) {
      loadService();
    }
  }, [id]);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: id,
          customerName: booking.name,
          customerPhone: booking.phone,
          date: booking.date,
          message: booking.message
        }),
      });

      if (response.ok) {
        alert("¡Reserva enviada! El proveedor se contactará contigo pronto.");
        setBooking({ name: "", phone: "", date: "", message: "" });
      } else {
        alert("No se pudo enviar la reserva. Intenta de nuevo.");
      }
    } catch (error) {
      alert("Error al enviar la reserva. Intenta de nuevo.");
    }
    
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Servicio no encontrado
            </h1>
            <p className="text-gray-600">
              El servicio que buscas no existe o ha sido removido.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Service Image */}
          <Card className="overflow-hidden">
            <img 
              src={service.images[0]} 
              alt={service.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </Card>

          {/* Service Details */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {service.description}
                  </p>
                </div>
                {service.featured && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    DESTACADO
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {service.rating} ({service.reviews} reseñas)
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {service.city}
                </Badge>
                <Badge variant="outline">
                  {service.category}
                </Badge>
              </div>

              {/* Provider Info */}
              <Card className="border-dashed border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Información del Proveedor
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-medium">{service.provider_name}</span>
                    {service.provider_phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {service.provider_phone}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900 mb-6">
                ${service.price}/hora
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    required
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    placeholder="Tu nombre"
                    data-testid="input-booking-name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                  <Input
                    id="phone"
                    required
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    placeholder="787-000-0000"
                    data-testid="input-booking-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="date">Fecha preferida</Label>
                  <Input
                    id="date"
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    data-testid="input-booking-date"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje adicional (opcional)</Label>
                  <Input
                    id="message"
                    value={booking.message}
                    onChange={(e) => setBooking({ ...booking, message: e.target.value })}
                    placeholder="Detalles del servicio..."
                    data-testid="input-booking-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={submitting}
                  data-testid="button-submit-booking"
                >
                  {submitting ? "Enviando..." : "Solicitar Reserva"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Sin cargos hasta confirmar la fecha con el proveedor
                </p>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Respuesta típica en 2-4 horas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
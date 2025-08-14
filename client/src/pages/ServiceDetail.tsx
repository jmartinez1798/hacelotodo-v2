import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { useLocation } from "wouter";
import { Service } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ServiceDetail() {
  const [location, setLocation] = useLocation();
  const serviceId = location.split('/')[2];
  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerEmail: "",
    when: "",
  });
  const { toast } = useToast();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const service = services.find(s => s.id === serviceId);

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof bookingData) => {
      return await apiRequest('POST', '/api/bookings', {
        serviceId: serviceId,
        ...data
      });
    },
    onSuccess: () => {
      setLocation('/success');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al crear la reserva. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.customerName || !bookingData.customerEmail || !bookingData.when) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }
    bookingMutation.mutate(bookingData);
  };

  // Generate time slots for next 7 days
  const generateTimeSlots = (): Array<{day: string, time: string, datetime: string}> => {
    const slots: Array<{day: string, time: string, datetime: string}> = [];
    const times = ["9:00", "12:00", "15:00", "18:00"];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      times.forEach(time => {
        const dayName = i === 0 ? "Hoy" : 
                      i === 1 ? "Mañana" : 
                      date.toLocaleDateString('es-ES', { weekday: 'long' });
        
        slots.push({
          day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
          time: time,
          datetime: `${date.toISOString().split('T')[0]} ${time}`,
        });
      });
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  if (isLoading) {
    return (
      <main className="py-8 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-64 bg-slate-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="py-8 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <i className="fas fa-exclamation-circle text-6xl text-slate-300 mb-4"></i>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Servicio no encontrado</h1>
            <p className="text-slate-600">El servicio que buscas no existe o ha sido eliminado.</p>
          </div>
        </div>
      </main>
    );
  }

  const imageUrl = service.images && service.images.length > 0 
    ? service.images[0] 
    : "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400";

  return (
    <main className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src={imageUrl} 
                alt={service.title} 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Sobre este servicio</h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{service.title}</h1>
                  <p className="text-slate-600">{service.city}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="text-slate-600">{service.rating} (94 reseñas)</span>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">Precio</span>
                  <span className="text-2xl font-bold text-primary-600">${service.price}/hora</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Horarios disponibles</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {timeSlots.slice(0, 4).map((slot, index) => (
                    <button 
                      key={index}
                      onClick={() => setBookingData({ ...bookingData, when: slot.datetime })}
                      className={`border rounded-lg py-3 text-center transition-colors ${
                        bookingData.when === slot.datetime 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-slate-300 hover:border-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">{slot.day}</div>
                      <div className="text-sm text-slate-600">{slot.time}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <form className="space-y-4" onSubmit={handleBooking}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                  <input 
                    type="text" 
                    required
                    value={bookingData.customerName}
                    onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={bookingData.customerEmail}
                    onChange={(e) => setBookingData({ ...bookingData, customerEmail: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={bookingMutation.isPending || !bookingData.when}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {bookingMutation.isPending ? 'Procesando...' : 'Reservar ahora'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

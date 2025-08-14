import { type Service, type InsertService, type Provider, type InsertProvider, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  getProviders(): Promise<Provider[]>;
  saveProviderLead(provider: InsertProvider): Promise<Provider>;
  
  getBookings(): Promise<Booking[]>;
  saveBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private providers: Map<string, Provider>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.services = new Map();
    this.providers = new Map();
    this.bookings = new Map();
    
    // Initialize with mock services
    this.initializeMockServices();
  }

  private initializeMockServices() {
    const mockServices: InsertService[] = [
      {
        title: "Electricista certificado",
        description: "Instalaciones eléctricas residenciales y comerciales con garantía",
        category: "hogar",
        city: "San Juan, PR",
        price: "45",
        rating: "4.9",
        featured: true,
        images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Estilista a domicilio",
        description: "Cortes y peinados profesionales en tu hogar",
        category: "belleza",
        city: "Bayamón, PR",
        price: "35",
        rating: "4.8",
        featured: false,
        images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Técnico informático",
        description: "Reparación y mantenimiento de equipos informáticos",
        category: "tecnologia",
        city: "Carolina, PR",
        price: "50",
        rating: "4.7",
        featured: true,
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Entrenador personal",
        description: "Sesiones personalizadas de fitness y nutrición",
        category: "fitness",
        city: "Ponce, PR",
        price: "40",
        rating: "4.9",
        featured: false,
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Limpieza de hogar",
        description: "Servicio de limpieza profesional con productos ecológicos",
        category: "hogar",
        city: "Caguas, PR",
        price: "30",
        rating: "4.8",
        featured: false,
        images: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Organizador de eventos",
        description: "Planificación completa de bodas y eventos corporativos",
        category: "eventos",
        city: "Guaynabo, PR",
        price: "150",
        rating: "4.6",
        featured: true,
        images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Cuidador de mascotas",
        description: "Paseos y cuidado de mascotas con experiencia veterinaria",
        category: "mascotas",
        city: "Arecibo, PR",
        price: "25",
        rating: "4.9",
        featured: false,
        images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      },
      {
        title: "Masajista terapéutico",
        description: "Masajes relajantes y terapéuticos a domicilio",
        category: "belleza",
        city: "Toa Baja, PR",
        price: "60",
        rating: "4.7",
        featured: false,
        images: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"]
      }
    ];

    mockServices.forEach(async (service) => {
      await this.createService(service);
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = {
      ...insertService,
      id,
      createdAt: new Date(),
      rating: insertService.rating ?? null,
      featured: insertService.featured ?? null,
      images: insertService.images ? [...insertService.images] : null,
    };
    this.services.set(id, service);
    return service;
  }

  async getProviders(): Promise<Provider[]> {
    return Array.from(this.providers.values());
  }

  async saveProviderLead(insertProvider: InsertProvider): Promise<Provider> {
    const id = randomUUID();
    const provider: Provider = {
      ...insertProvider,
      id,
      createdAt: new Date(),
      name: insertProvider.name ?? null,
      email: insertProvider.email ?? null,
      phone: insertProvider.phone ?? null,
      category: insertProvider.category ?? null,
    };
    this.providers.set(id, provider);
    return provider;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async saveBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }
}

export const storage = new MemStorage();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProviderSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Get single service (with provider data for profiles)
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      // Add provider data for profile pages
      const serviceWithProvider = {
        ...service,
        provider_name: `${service.title.split(' ')[0]} Profesional`,
        provider_phone: "787-555-0123",
        provider_city: service.city,
        provider_rating: service.rating,
        reviews: Math.floor(Math.random() * 50) + 10
      };
      
      res.json(serviceWithProvider);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  // Provider pre-registration
  app.post("/api/providers/pre-register", async (req, res) => {
    try {
      const validatedData = insertProviderSchema.parse(req.body);
      const provider = await storage.saveProviderLead(validatedData);
      res.json({ success: true, id: provider.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to save provider lead" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Calculate commission (for future monetization)
      const commissionRate = parseFloat(process.env.COMMISSION_RATE || "0.10");
      
      const booking = await storage.saveBooking(validatedData);
      
      res.json({ 
        success: true, 
        id: booking.id,
        commissionRate: commissionRate 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid booking data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // SEO and utility routes
  app.get("/sitemap.xml", (req, res) => {
    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=86400"); // Cache for 24 hours
    const base = `https://${req.headers.host}`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>${base}/</loc><changefreq>daily</changefreq></url>
      <url><loc>${base}/explore</loc><changefreq>daily</changefreq></url>
      <url><loc>${base}/provider</loc><changefreq>weekly</changefreq></url>
    </urlset>`;
    res.send(xml);
  });

  app.get("/robots.txt", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "public, max-age=86400"); // Cache for 24 hours
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://${req.headers.host}/sitemap.xml`;
    res.send(robotsTxt);
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      version: "1.0.0" 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

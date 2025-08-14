import React, { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {
  // ----------------------- STATE -----------------------
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("San Juan, PR");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Hogar",
    city: "San Juan, PR",
  });

  const { toast } = useToast();

  // -------------------- MOCK DATA ----------------------
  const categories = useMemo(
    () => [
      { name: "Hogar", icon: HomeIcon },
      { name: "Limpieza", icon: SparkIcon },
      { name: "Plomería", icon: PipeIcon },
      { name: "Electricidad", icon: BoltIcon },
      { name: "Jardinería", icon: LeafIcon },
      { name: "Transporte", icon: TruckIcon },
      { name: "Tecnología", icon: LaptopIcon },
      { name: "Belleza", icon: ScissorIcon },
      { name: "Eventos", icon: PartyIcon },
      { name: "Mascotas", icon: PawIcon },
      { name: "Fitness", icon: DumbbellIcon },
    ],
    []
  );

  const featured = useMemo(
    () => [
      {
        id: "svc1",
        title: "Electricista certificado",
        desc: "Instalaciones y emergencias residenciales/comerciales.",
        priceFrom: 45,
        city: "Bayamón, PR",
        rating: 4.9,
        reviews: 127,
        img: "https://images.unsplash.com/photo-1541881856704-3c4b2896c0f8?q=80&w=1600&auto=format&fit=crop",
      },
      {
        id: "svc2",
        title: "Técnico de computadoras",
        desc: "Reparación, limpieza y upgrades. A domicilio.",
        priceFrom: 50,
        city: "Toa Alta, PR",
        rating: 4.8,
        reviews: 93,
        img: "https://images.unsplash.com/photo-1581093588401-16b1c2c9f8f1?q=80&w=1600&auto=format&fit=crop",
      },
      {
        id: "svc3",
        title: "Limpieza profunda de hogar",
        desc: "Equipo propio, eco-friendly. Satisfaction guaranteed.",
        priceFrom: 65,
        city: "Guaynabo, PR",
        rating: 4.7,
        reviews: 210,
        img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop",
      },
    ],
    []
  );

  // Provider registration mutation
  const providerMutation = useMutation({
    mutationFn: async (data: typeof postForm) => {
      // Map form data to backend schema
      const providerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        category: data.category.toLowerCase(),
      };
      
      return await apiRequest('POST', '/api/providers/pre-register', providerData);
    },
    onSuccess: () => {
      toast({
        title: "¡Registro exitoso!",
        description: "Te contactaremos pronto para completar tu perfil.",
      });
      setShowPostModal(false);
      setPostForm({
        name: "",
        email: "",
        phone: "",
        category: "Hogar",
        city: "San Juan, PR",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu registro. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  // ------------------- HANDLERS ------------------------
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault?.();
    const url = `/explore?q=${encodeURIComponent(q)}&loc=${encodeURIComponent(loc)}`;
    window.location.href = url;
  };

  const handlePickCategory = (name: string) => {
    setQ(name);
    // Navigate immediately for better conversion
    const url = `/explore?category=${encodeURIComponent(name.toLowerCase())}`;
    window.location.href = url;
  };

  const handleOpenPost = () => setShowPostModal(true);
  const handleClosePost = () => setShowPostModal(false);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.name || !postForm.email || !postForm.phone) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    providerMutation.mutate(postForm);
  };

  // --------------------- RENDER ------------------------
  return (
    <div id="hacelotodo" className="page">
      <Header onClickPost={handleOpenPost} />

      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Encuentra y reserva <span>profesionales</span> en minutos
          </h1>
          <p className="hero__subtitle">
            Conectamos clientes con profesionales verificados.{" "}
            <strong>Publica gratis</strong> y solo pagas comisión por{" "}
            <strong>reserva confirmada</strong>.
          </p>

          <form className="search" onSubmit={handleSearch}>
            <div className="search__field">
              <SearchIcon />
              <input
                aria-label="¿Qué servicio necesitas?"
                placeholder="¿Qué necesitas? Ej: Plomería, limpieza, mudanza…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="search__field">
              <PinIcon />
              <input
                aria-label="Ubicación"
                placeholder="Ubicación"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
              />
            </div>
            <button className="btn btn--primary" type="submit" data-cta="buscar" data-testid="button-search">
              Buscar profesionales
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleOpenPost}
              data-cta="publicar"
              data-testid="button-publish"
            >
              Publicar servicio gratis
            </button>
          </form>

          {/* Promo de conversión */}
          <div className="promo">
            <span className="badge">Nuevo</span>
            <span>
              <strong>10% OFF</strong> en tu primera reserva con el código{" "}
              <code>HAZLO10</code>
            </span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="visual-card">
            <img
              src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1400&auto=format&fit=crop"
              alt="Profesionales trabajando"
            />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* CATEGORIES */}
      <section className="section">
        <h2 className="section__title">Categorías populares</h2>
        <p className="section__sub">Encuentra el profesional que necesitas</p>
        <div className="cat-grid">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="cat"
              onClick={() => handlePickCategory(name)}
              data-cat={name}
              data-testid={`category-${name.toLowerCase()}`}
            >
              <Icon />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <h2 className="section__title">Servicios destacados</h2>
        <p className="section__sub">Los mejores profesionales de tu zona</p>
        <div className="card-grid">
          {featured.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>

        <div className="center">
          <a className="btn btn--primary" href="/explore" data-cta="ver-todos" data-testid="link-view-all">
            Ver todos los servicios
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how">
        <h2 className="section__title">¿Cómo funciona?</h2>
        <div className="how-grid">
          <Step
            icon={RequestIcon}
            title="1. Pide"
            text="Cuenta qué necesitas y dónde. Es gratis y toma <2 min."
          />
          <Step
            icon={CompareIcon}
            title="2. Compara"
            text="Recibe cotizaciones, perfiles y reseñas verificadas."
          />
          <Step
            icon={ChatIcon}
            title="3. Reserva"
            text="Chatea, agenda y paga seguro cuando todo esté listo."
          />
        </div>
      </section>

      {/* PROVIDER BANNER */}
      <ProviderBanner onClickPost={handleOpenPost} />

      {/* FOOTER */}
      <Footer />

      {/* STICKY MOBILE CTA */}
      <div className="sticky-cta">
        <button className="btn btn--primary" onClick={handleSearch} data-testid="button-search-sticky">
          Buscar ahora
        </button>
        <button className="btn btn--ghost" onClick={handleOpenPost} data-testid="button-publish-sticky">
          Publicar gratis
        </button>
      </div>

      {/* MODAL PUBLICAR SERVICIO */}
      {showPostModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal__inner">
            <button className="modal__close" onClick={handleClosePost} aria-label="Cerrar" data-testid="button-close-modal">
              ×
            </button>
            <h3>Publicar servicio (gratis)</h3>
            <form className="form" onSubmit={handleSubmitPost}>
              <label>
                Nombre del negocio / profesional
                <input
                  required
                  value={postForm.name}
                  onChange={(e) => setPostForm({ ...postForm, name: e.target.value })}
                  placeholder="Ej: Monchis Limpieza"
                  data-testid="input-provider-name"
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={postForm.email}
                  onChange={(e) => setPostForm({ ...postForm, email: e.target.value })}
                  placeholder="tu@email.com"
                  data-testid="input-provider-email"
                />
              </label>
              <label>
                Teléfono / WhatsApp
                <input
                  required
                  value={postForm.phone}
                  onChange={(e) => setPostForm({ ...postForm, phone: e.target.value })}
                  placeholder="787-000-0000"
                  data-testid="input-provider-phone"
                />
              </label>
              <label>
                Categoría
                <select
                  value={postForm.category}
                  onChange={(e) =>
                    setPostForm({ ...postForm, category: e.target.value })
                  }
                  data-testid="select-provider-category"
                >
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Ciudad
                <input
                  value={postForm.city}
                  onChange={(e) => setPostForm({ ...postForm, city: e.target.value })}
                  placeholder="Ciudad / Pueblo"
                  data-testid="input-provider-city"
                />
              </label>
              <button 
                className="btn btn--primary" 
                type="submit" 
                data-cta="enviar-servicio"
                data-testid="button-submit-provider"
                disabled={providerMutation.isPending}
              >
                {providerMutation.isPending ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
            <p className="modal__note">
              * 0% de comisión en tus <strong>primeras 3 reservas</strong>. Verificación
              por llamada o WhatsApp en <strong>&lt;24h</strong>.
            </p>
          </div>
        </div>
      )}

      {/* -------- ESTILOS LOCALES -------- */}
      <style>{css}</style>
    </div>
  );
}

/* ---------------- COMPONENTES UI ---------------- */

interface HeaderProps {
  onClickPost: () => void;
}

function Header({ onClickPost }: HeaderProps) {
  return (
    <header className="topbar">
      <a className="brand" href="/">
        <span className="logo">Hacelotodo</span>
        <span className="dot">.com</span>
      </a>
      <nav className="nav">
        <a href="/explore">Explorar</a>
        <a href="#como-funciona">¿Cómo funciona?</a>
        <button className="btn btn--sm btn--primary" onClick={onClickPost} data-testid="button-header-publish">
          Publicar servicio
        </button>
      </nav>
    </header>
  );
}

function TrustBar() {
  return (
    <div className="trust">
      <span>Pagos seguros</span>
      <span>Reseñas verificadas</span>
      <span>Soporte 7d</span>
      <span>+1,000 reservas en PR</span>
    </div>
  );
}

interface ProviderBannerProps {
  onClickPost: () => void;
}

function ProviderBanner({ onClickPost }: ProviderBannerProps) {
  return (
    <section className="provider">
      <div className="provider__text">
        <h3>¿Ofreces servicios?</h3>
        <p>
          Gana más clientes en tu zona. <strong>Publica gratis</strong> y paga comisión
          solo cuando recibas una <strong>reserva confirmada</strong>. Bonificación:{" "}
          <strong>0% comisión</strong> en tus primeras <strong>3 reservas</strong>.
        </p>
      </div>
      <button className="btn btn--white" onClick={onClickPost} data-cta="post-provider" data-testid="button-provider-banner">
        Publicar servicio gratis
      </button>
    </section>
  );
}

interface ServiceCardProps {
  img: string;
  title: string;
  desc: string;
  priceFrom: number;
  city: string;
  rating: number;
  reviews: number;
  id: string;
}

function ServiceCard({ img, title, desc, priceFrom, city, rating, reviews, id }: ServiceCardProps) {
  return (
    <article className="card" data-testid={`card-service-${id}`}>
      <div className="card__img">
        <img src={img} alt={title} />
        <span className="tag">DESTACADO</span>
      </div>
      <div className="card__body">
        <h3>{title}</h3>
        <p className="muted">{desc}</p>
        <div className="card__meta">
          <Stars value={rating} /> <span className="muted">({reviews})</span>
        </div>
        <div className="card__foot">
          <div>
            <strong>${priceFrom}/hora</strong>
            <span className="muted"> · {city}</span>
          </div>
          <a className="btn btn--ghost btn--sm" href="/explore" data-testid={`link-profile-${id}`}>Ver perfil</a>
        </div>
      </div>
    </article>
  );
}

interface StepProps {
  icon: React.ComponentType;
  title: string;
  text: string;
}

function Step({ icon: Icon, title, text }: StepProps) {
  return (
    <div className="step">
      <div className="step__icon"><Icon /></div>
      <h4>{title}</h4>
      <p className="muted">{text}</p>
    </div>
  );
}

interface StarsProps {
  value?: number;
}

function Stars({ value = 5 }: StarsProps) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span aria-label={`${value} de 5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

/* ---------------- ICONOS (SVG inline, rápidos) ---------------- */
function HomeIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function SparkIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function PipeIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 10h8v4H3v-4Zm8 0V4h4v6m-4 4v6h4v-6m4-4h2v4h-2" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function BoltIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function LeafIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 4s-7-1-11 3-3 11-3 11 7 1 11-3 3-11 3-11Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function TruckIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 7h11v7h5l2 3v3h-3a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V7Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function LaptopIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 19h20" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function ScissorIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M20 4 9 12l11 8" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function PartyIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="m2 22 6-12 12 6-18 6Z" stroke="currentColor" strokeWidth="1.5"/><path d="M14 2s0 3 3 3 3 3 3 3" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function PawIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 18c0-2.5 2-4 4-4s4 1.5 4 4" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function DumbbellIcon(){ return <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M2 10h4v4H2v-4Zm16 0h4v4h-4v-4ZM7 11h10v2H7v-2Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function SearchIcon(){ return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function PinIcon(){ return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function RequestIcon(){ return <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 19h18" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function CompareIcon(){ return <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M4 6h8v12H4V6Zm8 3h8v9h-8V9Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function ChatIcon(){ return <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v10H7l-3 3V4Z" stroke="currentColor" strokeWidth="1.5"/></svg>; }

/* ---------------- CSS (scoped en este archivo) ---------------- */
const css = `
:root{
  --bg:#f6f8ff; --card:#fff; --text:#0f172a; --muted:#64748b;
  --primary:#2563eb; --primary-ink:#0b2a78; --ring:rgba(37,99,235,.25);
}
*{box-sizing:border-box} img{max-width:100%;display:block}
html,body,#root,#hacelotodo{height:100%}
body{margin:0;font-family: ui-sans-serif, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial}
a{color:inherit;text-decoration:none}

.page{min-height:100%;background: radial-gradient(1200px 600px at 20% 0%, #eaf0ff 0%, transparent 60%) , var(--bg); color:var(--text)}
.center{display:flex;justify-content:center;margin-top:16px}

.topbar{position:sticky;top:0;background:rgba(246,248,255,.8);backdrop-filter: blur(8px);display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #e7eaf6;z-index:50}
.brand{display:flex;align-items:baseline;font-weight:800;letter-spacing:.2px}
.brand .logo{color:var(--primary);font-size:20px}
.brand .dot{color:#9aa3b2;margin-left:2px}
.nav{display:flex;gap:16px;align-items:center}
.nav a{color:#27324b}
.btn{border-radius:12px;border:1px solid transparent;padding:12px 16px;font-weight:600;cursor:pointer;transition:.2s}
.btn--primary{background:var(--primary);color:white}
.btn--primary:hover{background:#1e4fd1}
.btn--ghost{background:transparent;border-color:#c8d0e6;color:var(--primary)}
.btn--ghost:hover{border-color:var(--primary)}
.btn--white{background:#fff;color:var(--primary);border-color:#e6eaf7}
.btn--sm{padding:8px 12px;border-radius:10px;font-size:14px}
.btn:disabled{opacity:0.5;cursor:not-allowed}

.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:32px;align-items:center;padding:48px 20px 24px;max-width:1200px;margin:0 auto}
.hero__title{font-size:48px;line-height:1.05;margin:0 0 12px;font-weight:900;letter-spacing:-.5px}
.hero__title span{color:var(--primary)}
.hero__subtitle{color:var(--text);opacity:.9;margin:0 0 20px;font-size:18px}
.search{display:grid;grid-template-columns:1.2fr 1fr auto auto;gap:10px;align-items:center}
.search__field{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e2e8f0;padding:12px 14px;border-radius:12px;box-shadow:0 1px 0 #eef2ff}
.search__field input{border:0;outline:none;width:100%;font-size:16px}
.search__field:focus-within{box-shadow:0 0 0 4px var(--ring)}
.promo{display:inline-flex;align-items:center;gap:10px;background:#eff6ff;border:1px dashed #bdd6ff;padding:10px 12px;border-radius:10px;margin-top:12px}
.badge{background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:999px;font-size:12px;border:1px solid #bcd3ff}
.hero__visual{display:flex;justify-content:center}
.visual-card{background:#fff;border:1px solid #e5e9f7;border-radius:24px;box-shadow:0 12px 40px rgba(16,34,80,.12);overflow:hidden;max-width:520px}
.visual-card img{aspect-ratio:16/10;object-fit:cover;width:100%}

.trust{max-width:1100px;margin:8px auto 0;display:flex;gap:18px;justify-content:center;flex-wrap:wrap;padding:8px 12px;color:#475569;font-size:14px}
.trust span{background:#fff;border:1px solid #e8ecfa;border-radius:999px;padding:6px 10px}

.section{max-width:1200px;margin:40px auto;padding:0 20px}
.section__title{font-size:28px;margin:0 0 4px}
.section__sub{color:var(--muted);margin:0 0 18px}
.cat-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.cat{background:#f2f6ff;border:1px solid #dfe6fb;border-radius:16px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;font-weight:700;color:#1f2a44;cursor:pointer}
.cat:hover{border-color:#b8c6f5;box-shadow:0 2px 14px rgba(37,99,235,.09)}
.cat span{font-size:14px}

.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card{background:var(--card);border:1px solid #e5e8f7;border-radius:18px;overflow:hidden;display:flex;flex-direction:column}
.card__img{position:relative}
.card__img .tag{position:absolute;top:12px;left:12px;background:#10b981;color:#083b2b;font-weight:800;font-size:12px;padding:6px 8px;border-radius:999px}
.card__body{padding:14px}
.card__body h3{margin:0 0 6px;font-size:18px}
.muted{color:var(--muted)}
.card__meta{display:flex;align-items:center;gap:6px;margin:8px 0}
.card__foot{display:flex;align-items:center;justify-content:space-between;margin-top:8px}

.how{background:linear-gradient(180deg,#ffffff 0%,#eef3ff 100%);border:1px solid #e5e9f7;border-radius:24px;padding:28px}
.how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.step{background:#fff;border:1px solid #e8ecfa;border-radius:16px;padding:16px;text-align:center}
.step__icon{display:flex;justify-content:center;margin-bottom:8px}

.provider{display:flex;align-items:center;justify-content:space-between;gap:24px;background:#1f2a44;color:#e8efff;border-radius:24px;padding:22px;margin:36px auto;max-width:1200px}
.provider__text h3{margin:0 0 6px}
.provider .btn--white{border-color:transparent}
.footer{border-top:1px solid #e7eaf6;padding:28px 20px;color:#5b657a}
.footer__grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:16px;max-width:1200px;margin:0 auto}
.footer a{color:#334155}

.sticky-cta{position:fixed;bottom:10px;left:0;right:0;display:none;gap:12px;justify-content:center}
.sticky-cta .btn{box-shadow:0 8px 20px rgba(16,34,80,.18)}
.modal{position:fixed;inset:0;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:16px;z-index:60}
.modal__inner{background:#fff;border-radius:16px;max-width:520px;width:100%;padding:18px;border:1px solid #e8ecfa;position:relative}
.modal__close{position:absolute;right:20px;top:14px;font-size:26px;border:0;background:transparent;cursor:pointer}
.form{display:grid;gap:10px;margin-top:8px}
.form label{display:block;margin-bottom:8px}
.form input, .form select{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #dfe3ef;margin-top:4px}
.modal__note{color:#6b7280;font-size:13px;margin-top:10px}

@media (max-width: 1000px){
  .hero{grid-template-columns:1fr;gap:18px}
  .search{grid-template-columns:1fr;gap:8px}
  .card-grid{grid-template-columns:1fr 1fr}
  .cat-grid{grid-template-columns:repeat(3,1fr)}
  .footer__grid{grid-template-columns:1fr 1fr}
  .sticky-cta{display:flex}
}
@media (max-width: 560px){
  .card-grid{grid-template-columns:1fr}
  .cat-grid{grid-template-columns:repeat(2,1fr)}
  .hero__title{font-size:34px}
  .how-grid{grid-template-columns:1fr}
  .provider{flex-direction:column;text-align:center}
}
`;

/* ---------------- FOOTER ---------------- */
function Footer(){
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="brand"><span className="logo">Hacelotodo</span><span className="dot">.com</span></div>
          <p>Marketplace de servicios en Puerto Rico. Publica gratis. Solo pagas comisión por reserva confirmada.</p>
        </div>
        <div>
          <strong>Empresa</strong>
          <div><a href="/sobre">Sobre nosotros</a></div>
          <div><a href="/prensa">Prensa</a></div>
          <div><a href="/afiliados">Programa de afiliados</a></div>
        </div>
        <div>
          <strong>Ayuda</strong>
          <div><a href="/soporte">Centro de ayuda</a></div>
          <div><a href="/seguridad">Seguridad</a></div>
          <div><a href="/pagos">Pagos y comisiones</a></div>
        </div>
        <div>
          <strong>Legal</strong>
          <div><a href="/terminos">Términos</a></div>
          <div><a href="/privacidad">Privacidad</a></div>
          <div><a href="/cookies">Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}
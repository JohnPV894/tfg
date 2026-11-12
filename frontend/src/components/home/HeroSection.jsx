import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Flame, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '../../utils/formatters';
import './HeroSection.css';

export default function HeroSection({ spotlightProduct, onDemoAction }) {
  const discount = spotlightProduct
    ? getDiscountPercentage(spotlightProduct.price, spotlightProduct.oldPrice)
    : 0;

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Banner principal promocional */}
        <div className="hero-main-banner">
          <img
            src="/images/hero/hero-banner.jpg"
            alt="Estación PC Gaming y Workstation CoreByte"
            className="hero-main-banner__bg"
          />
          <div className="hero-main-banner__overlay" />

          <div className="hero-main-banner__content">
            <span className="hero-eyebrow">
              <Sparkles size={14} />
              Campaña Hardware 2026
            </span>
            <h1>Potencia profesional para Gaming, IA y Workstations</h1>
            <p>
              Descubre portátiles de última generación, tarjetas gráficas RTX Serie 40,
              procesadores Ryzen X3D y monitores Nano IPS con entrega rápida y garantía oficial.
            </p>

            <div className="hero-cta-group">
              <Link to="/catalogo" className="btn btn-accent">
                <span>Explorar catálogo</span>
                <ArrowRight size={17} />
              </Link>
              <a href="#ofertas" className="btn hero-secondary-btn">
                <Flame size={17} />
                <span>Ver ofertas activas</span>
              </a>
            </div>

            <div className="hero-metrics">
              <div className="hero-metric">
                <Cpu size={16} />
                <span>Componentes verificados</span>
              </div>
              <div className="hero-metric">
                <ShieldCheck size={16} />
                <span>3 años de garantía</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna lateral derecha inspirada en xcom-shop.ru */}
        <div className="hero-side-stack">
          <div className="hero-side-card hero-side-card--config">
            <div className="hero-side-card__top">
              <span className="hero-side-pill">Herramienta visual</span>
              <Wrench size={20} className="hero-side-card__icon" />
            </div>
            <h3>Configurador de PC a medida</h3>
            <p>
              Selecciona placa, procesador, gráfica y memoria con verificación visual de montaje.
            </p>
            <button
              type="button"
              className="hero-side-link-btn"
              onClick={() =>
                onDemoAction?.(
                  'Configurador PC (visual)',
                  'Acceso estético al configurador. En esta fase no ejecuta lógica real ni modifica la base de datos.'
                )
              }
            >
              <span>Abrir configurador</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="hero-side-card hero-side-card--spotlight">
            <div className="hero-side-card__top">
              <span className="hero-side-pill hero-side-pill--amber">
                Producto destacado BD
              </span>
              {discount > 0 && (
                <span className="hero-discount-chip">-{discount}%</span>
              )}
            </div>

            {spotlightProduct ? (
              <Link
                to={`/producto/${spotlightProduct._id}`}
                className="spotlight-product-box"
              >
                <div className="spotlight-product-box__img">
                  <img
                    src={spotlightProduct.image}
                    alt={spotlightProduct.name}
                  />
                </div>
                <div className="spotlight-product-box__info">
                  <span className="spotlight-product-box__brand">
                    {spotlightProduct.brand}
                  </span>
                  <h4>{spotlightProduct.name}</h4>
                  <div className="spotlight-product-box__prices">
                    <strong>{formatPrice(spotlightProduct.price)}</strong>
                    {spotlightProduct.oldPrice && (
                      <span>{formatPrice(spotlightProduct.oldPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="spotlight-placeholder">
                <h4>Oferta especial conectada a MongoDB</h4>
                <p>
                  Cuando la colección de productos responde desde MongoDB, aquí se muestra una
                  oferta real destacada.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


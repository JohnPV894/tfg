import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { fetchProducts } from '../services/productService';
import CategoryShowcase from '../components/home/CategoryShowcase';
import BrandsStrip from '../components/home/BrandsStrip';
import ProductCard from '../components/products/ProductCard';
import {
  EmptyDatabaseState,
  ErrorState,
  LoadingState,
} from '../components/common/StatusFeedback';
import './HomePage.css';

export default function HomePage({ onDemoAction }) {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const items = await fetchProducts();
      setProducts(items);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (location.hash === '#ofertas') {
      const target = document.getElementById('ofertas');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const offerProducts = products.filter((item) => item.isOffer || item.oldPrice);
  const featuredProducts = products.filter((item) => item.isFeatured);

  const visibleOffers = (offerProducts.length > 0 ? offerProducts : products).slice(0, 4);
  const visibleFeatured = (featuredProducts.length > 0 ? featuredProducts : products).slice(
    0,
    8
  );

  return (
    <div className="home-page">
      <CategoryShowcase />

      {/* Sección Ofertas */}
      <section id="ofertas" className="section-block">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <h2 className="section-title">Ofertas y descuentos</h2>
              <span className="section-badge">
                <Flame size={13} />
                Ofertas Flash
              </span>
            </div>
            <Link to="/catalogo" className="section-link">
              <span>Ver todas las ofertas</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={loadProducts} />
          ) : products.length === 0 ? (
            <EmptyDatabaseState onRetry={loadProducts} />
          ) : (
            <div className="products-grid">
              {visibleOffers.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onDemoAction={onDemoAction}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner intermedio corporativo/montaje */}
      <section className="section-block">
        <div className="container">
          <div className="promo-mid-banner">
            <div className="promo-mid-banner__text">
              <span className="promo-mid-banner__eyebrow">Servicio Técnico CoreByte</span>
              <h3>Montaje profesional, actualización de BIOS y envío asegurado en 24/48h</h3>
              <p>
                Cada equipo sobremesa y componente pasa pruebas térmicas y de estabilidad antes
                de salir de nuestro centro logístico.
              </p>
            </div>
            <Link to="/catalogo" className="btn btn-accent">
              <span>Explorar componentes</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Productos Destacados desde MongoDB */}
      <section className="section-block">
        <div className="container">
          <div className="section-header">
            <div className="section-title-group">
              <h2 className="section-title">Productos destacados</h2>
              <span className="section-badge section-badge--cyan">
                <Sparkles size={13} />
                Desde MongoDB
              </span>
            </div>
            <Link to="/catalogo" className="section-link">
              <span>Ir al catálogo completo</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={loadProducts} />
          ) : products.length === 0 ? (
            <EmptyDatabaseState onRetry={loadProducts} />
          ) : (
            <div className="products-grid">
              {visibleFeatured.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onDemoAction={onDemoAction}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <BrandsStrip />
    </div>
  );
}

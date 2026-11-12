import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  GitCompareArrows,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
} from 'lucide-react';
import { fetchProductById } from '../services/productService';
import RatingStars from '../components/common/RatingStars';
import { ErrorState, LoadingState } from '../components/common/StatusFeedback';
import {
  formatPrice,
  getDiscountPercentage,
  getStockBadgeInfo,
} from '../utils/formatters';
import './ProductDetailPage.css';

export default function ProductDetailPage({ onDemoAction }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('specs');
  const [visualQty, setVisualQty] = useState(1);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const item = await fetchProductById(id);
      setProduct(item);
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="container">
          <LoadingState message="Consultando ficha del producto en MongoDB..." />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-page">
        <div className="container">
          <ErrorState
            message={error || 'No se pudo cargar el producto desde MongoDB.'}
            onRetry={loadProduct}
          />
          <div style={{ marginTop: 18 }}>
            <Link to="/catalogo" className="btn btn-outline">
              <ArrowLeft size={16} />
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercentage(product.price, product.oldPrice);
  const stockInfo = getStockBadgeInfo(product.stock);

  return (
    <div className="detail-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/catalogo">Catálogo</Link>
          <ChevronRight size={14} />
          <span>{product.category}</span>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className="detail-main-card">
          {/* Galería / imagen principal */}
          <div className="detail-gallery">
            <div className="detail-gallery__badges">
              {discount > 0 && (
                <span className="badge badge--discount">-{discount}% DTO</span>
              )}
              {product.badge && (
                <span className="badge badge--tag">{product.badge}</span>
              )}
            </div>

            <div className="detail-gallery__stage">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/products/cpu-ryzen7.svg';
                }}
              />
            </div>

            <div className="detail-gallery__meta-strip">
              <span>Marca: <strong>{product.brand}</strong></span>
              {product.sku && <span>Ref.: <code>{product.sku}</code></span>}
            </div>
          </div>

          {/* Información de compra y especificaciones clave */}
          <div className="detail-info">
            <div className="detail-info__top">
              <span className="detail-category-chip">{product.category}</span>
              <RatingStars
                rating={product.rating}
                reviewsCount={product.reviewsCount}
              />
            </div>

            <h1>{product.name}</h1>
            <p className="detail-short-desc">{product.description}</p>

            {Array.isArray(product.highlights) && product.highlights.length > 0 && (
              <ul className="detail-highlights">
                {product.highlights.map((item) => (
                  <li key={item}>
                    <Check size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="detail-buy-box">
              <div className="detail-buy-box__price-row">
                <div>
                  <strong className="detail-price">{formatPrice(product.price)}</strong>
                  {product.oldPrice && (
                    <span className="detail-old-price">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  <span className="detail-vat-note">IVA incluido</span>
                </div>
                <span className={`stock-pill stock-pill--${stockInfo.variant}`}>
                  {stockInfo.label}
                </span>
              </div>

              <div className="detail-buy-box__actions">
                <div className="qty-visual-control" aria-label="Cantidad visual">
                  <button
                    type="button"
                    onClick={() => setVisualQty((q) => Math.max(1, q - 1))}
                    aria-label="Reducir cantidad visual"
                  >
                    <Minus size={15} />
                  </button>
                  <span>{visualQty}</span>
                  <button
                    type="button"
                    onClick={() => setVisualQty((q) => q + 1)}
                    aria-label="Aumentar cantidad visual"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary detail-buy-btn"
                  onClick={() =>
                    onDemoAction?.(
                      'Añadir al carrito (visual)',
                      `Botón visual para añadir ${visualQty} ud. de "${product.name}". No modifica base de datos ni carrito real.`
                    )
                  }
                >
                  <ShoppingCart size={18} />
                  <span>Añadir al carrito</span>
                </button>

                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={() =>
                    onDemoAction?.(
                      'Compra rápida (visual)',
                      'La pasarela de pago y pedidos no están implementados en esta demo visual.'
                    )
                  }
                >
                  Comprar ahora
                </button>
              </div>

              <div className="detail-secondary-actions">
                <button
                  type="button"
                  onClick={() =>
                    onDemoAction?.('Favoritos (visual)', 'Acción puramente estética.')
                  }
                >
                  <Heart size={15} />
                  <span>Guardar en favoritos</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onDemoAction?.('Comparar (visual)', 'Acción puramente estética.')
                  }
                >
                  <GitCompareArrows size={15} />
                  <span>Añadir a comparar</span>
                </button>
              </div>
            </div>

            <div className="detail-logistics">
              <div className="detail-logistics__item">
                <Truck size={18} />
                <div>
                  <strong>Envío urgente 24/48h</strong>
                  <span>Gratis en pedidos superiores a 99 €</span>
                </div>
              </div>
              <div className="detail-logistics__item">
                <Store size={18} />
                <div>
                  <strong>Recogida en tienda Vigo</strong>
                  <span>Disponible hoy con confirmación</span>
                </div>
              </div>
              <div className="detail-logistics__item">
                <ShieldCheck size={18} />
                <div>
                  <strong>Garantía oficial 3 años</strong>
                  <span>Soporte directo con fabricante autorizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de descripción y ficha técnica */}
        <div className="detail-tabs-card">
          <div className="detail-tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'specs'}
              className={`detail-tab-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Características técnicas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'desc'}
              className={`detail-tab-btn ${activeTab === 'desc' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('desc')}
            >
              Descripción general
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'warranty'}
              className={`detail-tab-btn ${activeTab === 'warranty' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('warranty')}
            >
              Envío y Garantía
            </button>
          </div>

          <div className="detail-tabs-panel">
            {activeTab === 'specs' && (
              <div className="specs-table-wrap">
                {Array.isArray(product.specs) && product.specs.length > 0 ? (
                  <table className="specs-table">
                    <tbody>
                      {product.specs.map((row) => (
                        <tr key={row.label}>
                          <th>{row.label}</th>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="detail-panel-text">
                    Este documento de MongoDB no incluye especificaciones técnicas detalladas.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'desc' && (
              <div className="detail-panel-text">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="detail-panel-text">
                <h3>Condiciones de envío y garantía (vista informativa)</h3>
                <p>
                  Todos los productos de CoreByte cuentan con garantía legal de 3 años y
                  embalaje antiestático reforzado para componentes sensibles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


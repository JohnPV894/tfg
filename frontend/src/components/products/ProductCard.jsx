import { Link } from 'react-router-dom';
import { GitCompareArrows, Heart, ShoppingCart } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import {
  formatPrice,
  getDiscountPercentage,
  getStockBadgeInfo,
} from '../../utils/formatters';
import './ProductCard.css';

export default function ProductCard({ product, onDemoAction }) {
  const discount = getDiscountPercentage(product.price, product.oldPrice);
  const stockInfo = getStockBadgeInfo(product.stock);
  const savings =
    product.oldPrice && product.oldPrice > product.price
      ? product.oldPrice - product.price
      : 0;

  return (
    <article className="product-card">
      {/* Cabecera de badges y acciones rápidas */}
      <div className="product-card__top-bar">
        <div className="product-card__badges">
          {discount > 0 && (
            <span className="badge badge--discount">-{discount}%</span>
          )}
          {product.badge && (
            <span className="badge badge--tag">{product.badge}</span>
          )}
        </div>

        <div className="product-card__quick-icons">
          <button
            type="button"
            className="card-icon-btn"
            aria-label="Añadir a favoritos (visual)"
            onClick={() =>
              onDemoAction?.(
                'Favoritos (visual)',
                `"${product.name}" marcado visualmente en esta vista.`
              )
            }
          >
            <Heart size={15} />
          </button>
          <button
            type="button"
            className="card-icon-btn"
            aria-label="Comparar producto (visual)"
            onClick={() =>
              onDemoAction?.(
                'Comparador (visual)',
                `"${product.name}" añadido visualmente al comparador.`
              )
            }
          >
            <GitCompareArrows size={15} />
          </button>
        </div>
      </div>

      {/* Imagen del producto */}
      <Link to={`/producto/${product._id}`} className="product-card__image-box">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/products/cpu-ryzen7.svg';
          }}
        />
      </Link>

      {/* Metadatos y título */}
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          {product.sku && <span className="product-card__sku">{product.sku}</span>}
        </div>

        <Link to={`/producto/${product._id}`} className="product-card__title">
          {product.name}
        </Link>

        {Array.isArray(product.highlights) && product.highlights.length > 0 && (
          <ul className="product-card__highlights">
            {product.highlights.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <div className="product-card__status-row">
          <RatingStars
            rating={product.rating}
            reviewsCount={product.reviewsCount}
          />
          <span className={`stock-pill stock-pill--${stockInfo.variant}`}>
            {stockInfo.label}
          </span>
        </div>
      </div>

      {/* Pie con precios y CTA visual */}
      <div className="product-card__footer">
        <div className="product-card__pricing">
          <div className="product-card__price-line">
            <strong className="product-card__price">
              {formatPrice(product.price)}
            </strong>
            {product.oldPrice && (
              <span className="product-card__old-price">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <span className="product-card__savings">
              Ahorras {formatPrice(savings)}
            </span>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary product-card__cta"
          onClick={() =>
            onDemoAction?.(
              'Añadir al carrito (visual)',
              `Botón estético para "${product.name}". El carrito real no está implementado en esta demo.`
            )
          }
        >
          <ShoppingCart size={16} />
          <span>Añadir al carrito</span>
        </button>
      </div>
    </article>
  );
}


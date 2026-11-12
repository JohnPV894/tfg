import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Info,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import './CartPage.css';

/* Productos de ejemplo exclusivamente estéticos para la maqueta visual del carrito */
const SAMPLE_CART_ITEMS = [
  {
    sku: 'CB-GPU-204',
    name: 'MSI GeForce RTX 4070 SUPER GAMING X SLIM 12GB',
    brand: 'MSI',
    image: '/images/products/gpu-rtx4070.jpg',
    price: 649,
    oldPrice: 729,
    quantity: 1,
  },
  {
    sku: 'CB-RAM-603',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    brand: 'Corsair',
    image: '/images/products/ram-ddr5.jpg',
    price: 129,
    oldPrice: null,
    quantity: 1,
  },
  {
    sku: 'CB-PER-902',
    name: 'Razer DeathAdder V3 Pro Ultra-Lightweight 63g',
    brand: 'Razer',
    image: '/images/products/mouse-pro.svg',
    price: 134,
    oldPrice: null,
    quantity: 1,
  },
];

export default function CartPage({ onDemoAction }) {
  const subtotal = SAMPLE_CART_ITEMS.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const originalSubtotal = SAMPLE_CART_ITEMS.reduce(
    (acc, item) => acc + (item.oldPrice || item.price) * item.quantity,
    0
  );
  const totalDiscount = originalSubtotal - subtotal;

  function triggerVisualCartNotice(actionName) {
    onDemoAction?.(
      `${actionName} (solo visual)`,
      'Esta vista del carrito muestra productos de ejemplo para validar el diseño. No procesa pedidos ni modifica MongoDB.'
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <span>Carrito de compra</span>
        </nav>

        <div className="cart-layout">
          {/* Lista de productos de ejemplo */}
          <div className="cart-items-panel">
            <div className="cart-items-panel__header">
              <h1>Tu carrito ({SAMPLE_CART_ITEMS.length} artículos)</h1>
              <Link to="/catalogo" className="section-link">
                <ArrowLeft size={16} />
                <span>Seguir viendo catálogo</span>
              </Link>
            </div>

            <div className="cart-items-list">
              {SAMPLE_CART_ITEMS.map((item) => (
                <article key={item.sku} className="cart-item-row">
                  <div className="cart-item-row__img">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-row__info">
                    <span className="cart-item-row__brand">
                      {item.brand} · {item.sku}
                    </span>
                    <h3>{item.name}</h3>
                    <span className="cart-item-row__stock">
                      En stock · Envío 24/48h incluido
                    </span>
                  </div>

                  <div className="cart-item-row__qty">
                    <button
                      type="button"
                      aria-label="Reducir cantidad visual"
                      onClick={() => triggerVisualCartNotice('Selector de cantidad')}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Aumentar cantidad visual"
                      onClick={() => triggerVisualCartNotice('Selector de cantidad')}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="cart-item-row__price">
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                    {item.oldPrice && (
                      <span>{formatPrice(item.oldPrice * item.quantity)}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="cart-item-row__remove"
                    aria-label="Eliminar producto visual"
                    onClick={() => triggerVisualCartNotice('Eliminar del carrito')}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
          </div>

          {/* Resumen visual de compra */}
          <aside className="cart-summary-card">
            <h2>Resumen de compra</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal productos</span>
                <span>{formatPrice(originalSubtotal)}</span>
              </div>
              <div className="summary-line summary-line--discount">
                <span>Descuentos aplicados</span>
                <span>-{formatPrice(totalDiscount)}</span>
              </div>
              <div className="summary-line">
                <span>Envío estándar 24/48h</span>
                <strong className="summary-free">Gratis</strong>
              </div>
            </div>

            <div className="summary-promo-box">
              <input
                type="text"
                placeholder="Código promocional"
                aria-label="Código promocional"
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => triggerVisualCartNotice('Cupón promocional')}
              >
                Aplicar
              </button>
            </div>

            <div className="summary-total-row">
              <div>
                <strong>Total</strong>
                <span>IVA incluido</span>
              </div>
              <strong className="summary-total-amount">{formatPrice(subtotal)}</strong>
            </div>

            <button
              type="button"
              className="btn btn-accent summary-checkout-btn"
              onClick={() => triggerVisualCartNotice('Tramitar pedido')}
            >
              Tramitar pedido
            </button>

            <div className="summary-security-note">
              <ShieldCheck size={16} />
              <span>Entorno de demostración · Sin pasarela de pago real</span>
            </div>

            <div className="summary-payment-pills">
              <span>
                <CreditCard size={14} /> Visa / Mastercard
              </span>
              <span>Bizum</span>
              <span>Transferencia</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


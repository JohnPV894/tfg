import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ChevronDown,
  Cpu,
  Flame,
  GitCompareArrows,
  Heart,
  LayoutGrid,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import './Header.css';

const QUICK_CATEGORIES = [
  { label: 'Todos los productos', to: '/catalogo' },
  { label: 'Portátiles', to: '/catalogo' },
  { label: 'Tarjetas Gráficas', to: '/catalogo' },
  { label: 'Procesadores', to: '/catalogo' },
  { label: 'Placas Base', to: '/catalogo' },
  { label: 'Memoria RAM', to: '/catalogo' },
  { label: 'Almacenamiento SSD', to: '/catalogo' },
  { label: 'Monitores', to: '/catalogo' },
  { label: 'Periféricos', to: '/catalogo' },
];

export default function Header({ onDemoAction }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function handleVisualSearch(event) {
    event.preventDefault();
    onDemoAction?.(
      'Buscador visual (sin lógica funcional)',
      searchTerm.trim()
        ? `La búsqueda para "${searchTerm.trim()}" es estética en esta demo. Todos los productos visibles proceden directamente de MongoDB.`
        : 'La barra de búsqueda es exclusivamente visual en esta primera fase de diseño.'
    );
  }

  function handleVisualAction(title, message) {
    onDemoAction?.(title, message);
  }

  return (
    <header className="site-header">
      {/* Barra superior informativa inspirada en xcom-shop.ru */}
      <div className="top-utility-bar">
        <div className="container top-utility-bar__inner">
          <div className="top-utility-bar__left">
            <button
              type="button"
              className="utility-location-btn"
              onClick={() =>
                handleVisualAction(
                  'Selector de zona visual',
                  'Mostrando disponibilidad y envíos estimados para Vigo / Península (solo visual).'
                )
              }
            >
              <MapPin size={14} />
              <span>Vigo · Envío 24/48h</span>
            </button>
            <nav className="top-utility-links" aria-label="Información de tienda">
              <button
                type="button"
                className="utility-link-btn"
                onClick={() =>
                  handleVisualAction('Marcas oficiales', 'Catálogo visual de fabricantes autorizados.')
                }
              >
                Marcas
              </button>
              <button
                type="button"
                className="utility-link-btn"
                onClick={() =>
                  handleVisualAction('Configurador PC', 'Módulo visual de configuración a medida.')
                }
              >
                Configurador PC
              </button>
              <button
                type="button"
                className="utility-link-btn"
                onClick={() =>
                  handleVisualAction('Empresas B2B', 'Sección informativa visual para empresas y centros.')
                }
              >
                Empresas
              </button>
              <button
                type="button"
                className="utility-link-btn"
                onClick={() =>
                  handleVisualAction('Envío y Garantía', 'Garantía oficial de 3 años y soporte técnico.')
                }
              >
                Envío y Garantía
              </button>
            </nav>
          </div>

          <div className="top-utility-bar__right">
            <span className="utility-schedule">Lun–Vie 09:00–20:00</span>
            <a
              href="#soporte"
              className="utility-phone"
              onClick={(e) => {
                e.preventDefault();
                handleVisualAction(
                  'Atención telefónica',
                  'Teléfono de soporte comercial visual: 900 123 456.'
                );
              }}
            >
              <Phone size={13} />
              <span>900 123 456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cabecera principal */}
      <div className="main-header">
        <div className="container main-header__inner">
          <div className="main-header__brand-group">
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label="Abrir menú"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" className="brand-logo" onClick={() => setMegaMenuOpen(false)}>
              <span className="brand-logo__mark">
                <Cpu size={24} />
              </span>
              <span className="brand-logo__text">
                <span className="brand-logo__name">
                  Core<span>Byte</span>
                </span>
                <span className="brand-logo__tagline">Hardware &amp; Tech Store</span>
              </span>
            </Link>

            <div className="catalog-trigger-wrap">
              <button
                type="button"
                className={`catalog-trigger-btn ${megaMenuOpen ? 'is-active' : ''}`}
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                aria-expanded={megaMenuOpen}
              >
                <LayoutGrid size={18} />
                <span>Catálogo</span>
                <ChevronDown size={16} className="catalog-trigger-btn__chevron" />
              </button>
            </div>
          </div>

          {/* Buscador prominente (exclusivamente visual) */}
          <form className="header-search" onSubmit={handleVisualSearch} role="search">
            <input
              type="search"
              className="header-search__input"
              placeholder="Buscar ordenadores, RTX 4070, Ryzen 7, monitores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
            <button type="submit" className="header-search__btn">
              <Search size={18} />
              <span>Buscar</span>
            </button>
          </form>

          {/* Acciones de usuario a la derecha */}
          <div className="header-actions">
            <button
              type="button"
              className="header-action-item"
              onClick={() =>
                handleVisualAction(
                  'Favoritos (visual)',
                  'Lista visual de productos guardados. No realiza cambios en base de datos.'
                )
              }
            >
              <span className="header-action-item__icon">
                <Heart size={20} />
                <span className="action-badge action-badge--cyan">2</span>
              </span>
              <span className="header-action-item__label">Favoritos</span>
            </button>

            <button
              type="button"
              className="header-action-item header-action-item--hide-sm"
              onClick={() =>
                handleVisualAction(
                  'Comparador (visual)',
                  'Herramienta visual de comparación de especificaciones técnicas.'
                )
              }
            >
              <span className="header-action-item__icon">
                <GitCompareArrows size={20} />
              </span>
              <span className="header-action-item__label">Comparar</span>
            </button>

            <NavLink to="/acceso" className="header-action-item">
              <span className="header-action-item__icon">
                <User size={20} />
              </span>
              <span className="header-action-item__label">Acceder</span>
            </NavLink>

            <NavLink to="/carrito" className="header-action-item header-action-item--cart">
              <span className="header-action-item__icon">
                <ShoppingCart size={20} />
                <span className="action-badge action-badge--amber">3</span>
              </span>
              <span className="header-action-item__label">Carrito</span>
            </NavLink>
          </div>
        </div>

        {/* Mega-menú desplegable */}
        {megaMenuOpen && (
          <MegaMenu
            onClose={() => setMegaMenuOpen(false)}
            onDemoAction={onDemoAction}
          />
        )}
      </div>

      {/* Barra secundaria de categorías */}
      <nav
        className={`category-nav-strip ${mobileNavOpen ? 'is-open' : ''}`}
        aria-label="Categorías principales"
      >
        <div className="container category-nav-strip__inner">
          <div className="category-nav-strip__links">
            {QUICK_CATEGORIES.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="category-nav-pill"
                onClick={() => setMobileNavOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/#ofertas"
            className="category-nav-offer"
            onClick={() => setMobileNavOpen(false)}
          >
            <Flame size={15} />
            <span>Ofertas Flash</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}


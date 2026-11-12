import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import './CatalogSidebar.css';

const VISUAL_CATEGORIES = [
  'Todas las categorías',
  'Ordenadores y portátiles',
  'Componentes PC',
  'Almacenamiento',
  'Monitores',
  'Periféricos',
];

const VISUAL_BRANDS = ['ASUS', 'MSI', 'AMD', 'CoreByte', 'Corsair', 'Samsung', 'LG', 'Logitech', 'Razer'];

const VISUAL_SPECS = ['DDR5', 'PCIe 4.0', 'Wi-Fi 6E', '165Hz / 180Hz', 'Inalámbrico'];

export default function CatalogSidebar({ onDemoAction }) {
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedSpecs, setCheckedSpecs] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [minPrice, setMinPrice] = useState('100');
  const [maxPrice, setMaxPrice] = useState('2500');

  function toggleItem(list, setList, value) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  }

  function handleVisualFilterSubmit(event) {
    event.preventDefault();
    onDemoAction?.(
      'Filtros visuales (sin lógica de filtrado)',
      'Los filtros laterales muestran el diseño final del catálogo, pero la lista sigue mostrando todos los productos de MongoDB.'
    );
  }

  function handleVisualReset() {
    setSelectedCategory('Todas las categorías');
    setCheckedBrands([]);
    setCheckedSpecs([]);
    setInStockOnly(true);
    setMinPrice('100');
    setMaxPrice('2500');
  }

  return (
    <aside className="catalog-sidebar" aria-label="Filtros visuales del catálogo">
      <div className="catalog-sidebar__header">
        <div className="catalog-sidebar__title">
          <SlidersHorizontal size={18} />
          <h3>Filtros del catálogo</h3>
        </div>
      </div>

      {/* Categorías */}
      <div className="sidebar-group">
        <h4>Categorías</h4>
        <ul className="sidebar-cat-list">
          {VISUAL_CATEGORIES.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`sidebar-cat-btn ${
                  selectedCategory === category ? 'is-active' : ''
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  onDemoAction?.(
                    'Categoría seleccionada (visual)',
                    `Selección estética "${category}". En esta demo no se filtran los productos de MongoDB.`
                  );
                }}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleVisualFilterSubmit}>
        {/* Rango de precios */}
        <div className="sidebar-group">
          <h4>Rango de precio (€)</h4>
          <div className="price-inputs-row">
            <label>
              <span>Mín.</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </label>
            <label>
              <span>Máx.</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* Marcas */}
        <div className="sidebar-group">
          <h4>Marcas</h4>
          <div className="sidebar-checks">
            {VISUAL_BRANDS.map((brand) => (
              <label key={brand} className="sidebar-check-item">
                <input
                  type="checkbox"
                  checked={checkedBrands.includes(brand)}
                  onChange={() => toggleItem(checkedBrands, setCheckedBrands, brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="sidebar-group">
          <h4>Disponibilidad</h4>
          <label className="sidebar-check-item">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span>En stock (entrega 24/48h)</span>
          </label>
        </div>

        {/* Especificaciones */}
        <div className="sidebar-group">
          <h4>Características</h4>
          <div className="sidebar-checks">
            {VISUAL_SPECS.map((spec) => (
              <label key={spec} className="sidebar-check-item">
                <input
                  type="checkbox"
                  checked={checkedSpecs.includes(spec)}
                  onChange={() => toggleItem(checkedSpecs, setCheckedSpecs, spec)}
                />
                <span>{spec}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sidebar-actions">
          <button type="submit" className="btn btn-primary">
            Aplicar filtros
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleVisualReset}
          >
            Restablecer
          </button>
        </div>
      </form>
    </aside>
  );
}


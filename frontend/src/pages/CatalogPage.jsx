import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import { fetchProducts } from '../services/productService';
import CatalogSidebar from '../components/products/CatalogSidebar';
import ProductCard from '../components/products/ProductCard';
import {
  EmptyDatabaseState,
  ErrorState,
  LoadingState,
} from '../components/common/StatusFeedback';
import './CatalogPage.css';

export default function CatalogPage({ onDemoAction }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visualSort, setVisualSort] = useState('relevancia');
  const [visualView, setVisualView] = useState('grid');

  const loadCatalog = useCallback(async () => {
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
    loadCatalog();
  }, [loadCatalog]);

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <span>Catálogo de informática</span>
        </nav>

        <div className="catalog-layout">
          <CatalogSidebar onDemoAction={onDemoAction} />

          <div className="catalog-main">
            {/* Barra superior de ordenación y vista (estética) */}
            <div className="catalog-toolbar">
              <div className="catalog-toolbar__sort">
                <label htmlFor="visual-sort">Ordenar por:</label>
                <select
                  id="visual-sort"
                  value={visualSort}
                  onChange={(e) => {
                    setVisualSort(e.target.value);
                    onDemoAction?.(
                      'Ordenación visual (sin lógica real)',
                      'El selector de ordenación es estético; los productos se mantienen en el orden recibido desde MongoDB.'
                    );
                  }}
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="valoracion">Mejor valorados</option>
                </select>
              </div>

              <div className="catalog-toolbar__views" role="group" aria-label="Modo de vista">
                <button
                  type="button"
                  className={`view-toggle-btn ${visualView === 'grid' ? 'is-active' : ''}`}
                  onClick={() => setVisualView('grid')}
                  title="Vista en cuadrícula"
                >
                  <LayoutGrid size={17} />
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${visualView === 'compact' ? 'is-active' : ''}`}
                  onClick={() => {
                    setVisualView('compact');
                    onDemoAction?.(
                      'Cambio visual de vista',
                      'Control visual de diseño inspirado en catálogos de hardware.'
                    );
                  }}
                  title="Vista compacta"
                >
                  <List size={17} />
                </button>
              </div>
            </div>

            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} onRetry={loadCatalog} />
            ) : products.length === 0 ? (
              <EmptyDatabaseState onRetry={loadCatalog} />
            ) : (
              <div
                className={`catalog-products-grid ${
                  visualView === 'compact' ? 'catalog-products-grid--two' : ''
                }`}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onDemoAction={onDemoAction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


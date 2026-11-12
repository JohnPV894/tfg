import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  const handleAction = () => {};

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header onDemoAction={handleAction} />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage onDemoAction={handleAction} />} />
            <Route
              path="/catalogo"
              element={<CatalogPage onDemoAction={handleAction} />}
            />
            <Route
              path="/producto/:id"
              element={<ProductDetailPage onDemoAction={handleAction} />}
            />
            <Route
              path="/carrito"
              element={<CartPage onDemoAction={handleAction} />}
            />
            <Route
              path="/acceso"
              element={<AuthPage onDemoAction={handleAction} />}
            />
            <Route path="*" element={<HomePage onDemoAction={handleAction} />} />
          </Routes>
        </main>

        <Footer onDemoAction={handleAction} />
      </div>
    </BrowserRouter>
  );
}


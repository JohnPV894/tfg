import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import './Footer.css';

export default function Footer({ onDemoAction }) {
  const [email, setEmail] = useState('');

  function handleNewsletter(event) {
    event.preventDefault();
    onDemoAction?.(
      'Boletín visual',
      'La suscripción al boletín es puramente estética y no almacena correos.'
    );
    setEmail('');
  }

  return (
    <footer className="site-footer">
      {/* Franja de ventajas tecnológicas */}
      <div className="footer-trust-bar">
        <div className="container footer-trust-bar__grid">
          <div className="trust-item">
            <Truck size={22} />
            <div>
              <strong>Envío 24/48h</strong>
              <span>Entrega asegurada desde almacén</span>
            </div>
          </div>
          <div className="trust-item">
            <ShieldCheck size={22} />
            <div>
              <strong>3 años de garantía</strong>
              <span>Cobertura oficial de fabricantes</span>
            </div>
          </div>
          <div className="trust-item">
            <Wrench size={22} />
            <div>
              <strong>Montaje y Testeo</strong>
              <span>Laboratorio técnico especializado</span>
            </div>
          </div>
          <div className="trust-item">
            <Headphones size={22} />
            <div>
              <strong>Soporte Experto</strong>
              <span>Asesoramiento hardware personalizado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cuerpo principal del footer */}
      <div className="footer-main">
        <div className="container footer-main__grid">
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo__mark">
                <Cpu size={22} />
              </span>
              <span className="footer-logo__name">
                Core<span>Byte</span>
              </span>
            </Link>
            <p className="footer-brand-desc">
              Tienda online especializada en ordenadores, componentes de alto rendimiento,
              monitores y periféricos profesionales.
            </p>
          </div>

          <div className="footer-col">
            <h4>Catálogo</h4>
            <ul>
              <li>
                <Link to="/catalogo">Ordenadores y Portátiles</Link>
              </li>
              <li>
                <Link to="/catalogo">Tarjetas Gráficas y CPUs</Link>
              </li>
              <li>
                <Link to="/catalogo">Placas Base y RAM DDR5</Link>
              </li>
              <li>
                <Link to="/catalogo">Almacenamiento SSD NVMe</Link>
              </li>
              <li>
                <Link to="/catalogo">Monitores y Periféricos</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Atención al Cliente</h4>
            <ul>
              <li>
                <Link to="/carrito">Mi carrito visual</Link>
              </li>
              <li>
                <Link to="/acceso">Acceso / Registro</Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() =>
                    onDemoAction?.(
                      'Envío y devoluciones',
                      'Página informativa visual no implementada en esta demo.'
                    )
                  }
                >
                  Envíos y devoluciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() =>
                    onDemoAction?.(
                      'Garantía y RMA',
                      'Sección informativa visual no implementada en esta demo.'
                    )
                  }
                >
                  Garantía y servicio técnico
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto y Novedades</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={15} />
                <span>900 123 456 (Gratuito)</span>
              </li>
              <li>
                <Mail size={15} />
                <span>soporte@corebyte-demo.es</span>
              </li>
              <li>
                <MapPin size={15} />
                <span>Av. de Gran Vía 42, Vigo</span>
              </li>
            </ul>

            <form className="footer-newsletter" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Tu email para ofertas..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email para boletín visual"
              />
              <button type="submit" className="btn btn-accent">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <span>© 2026 CoreByte Tech Store</span>
        </div>
      </div>
    </footer>
  );
}


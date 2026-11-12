import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from 'lucide-react';
import './AuthPage.css';

export default function AuthPage({ onDemoAction }) {
  const [mode, setMode] = useState('login');

  function handleVisualSubmit(event) {
    event.preventDefault();
    onDemoAction?.(
      mode === 'login' ? 'Inicio de sesión visual' : 'Registro visual',
      'Formulario exclusivamente estético. La autenticación y gestión de usuarios no están implementadas.'
    );
  }

  return (
    <div className="auth-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <span>Acceso de clientes</span>
        </nav>

        <div className="auth-shell">
          <div className="auth-info-panel">
            <span className="auth-eyebrow">Área de Clientes · Vista Demo</span>
            <h1>Gestiona tus pedidos, presupuestos de PC y garantías</h1>
            <p>
              Interfaz visual de acceso y registro diseñada para el flujo completo de usuario en
              CoreByte.
            </p>

            <ul className="auth-benefits">
              <li>
                <ShieldCheck size={18} />
                <span>Seguimiento visual de pedidos y facturas</span>
              </li>
              <li>
                <ShieldCheck size={18} />
                <span>Guardado de configuraciones de PC y favoritos</span>
              </li>
              <li>
                <ShieldCheck size={18} />
                <span>Tramitación ágil de garantías oficiales</span>
              </li>
            </ul>
          </div>

          <div className="auth-form-card">
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`auth-tab ${mode === 'login' ? 'is-active' : ''}`}
                onClick={() => setMode('login')}
              >
                <User size={16} />
                <span>Iniciar sesión</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                className={`auth-tab ${mode === 'register' ? 'is-active' : ''}`}
                onClick={() => setMode('register')}
              >
                <UserPlus size={16} />
                <span>Crear cuenta</span>
              </button>
            </div>

            <form className="auth-form" onSubmit={handleVisualSubmit}>
              {mode === 'register' && (
                <label className="auth-field">
                  <span>Nombre completo</span>
                  <div className="auth-input-wrap">
                    <User size={17} />
                    <input type="text" placeholder="Ej. Laura Martínez" />
                  </div>
                </label>
              )}

              <label className="auth-field">
                <span>Correo electrónico</span>
                <div className="auth-input-wrap">
                  <Mail size={17} />
                  <input type="email" placeholder="nombre@correo.es" />
                </div>
              </label>

              <label className="auth-field">
                <span>Contraseña</span>
                <div className="auth-input-wrap">
                  <Lock size={17} />
                  <input type="password" placeholder="••••••••" />
                </div>
              </label>

              {mode === 'register' && (
                <label className="auth-field">
                  <span>Repetir contraseña</span>
                  <div className="auth-input-wrap">
                    <Lock size={17} />
                    <input type="password" placeholder="••••••••" />
                  </div>
                </label>
              )}

              <div className="auth-options-row">
                <label className="auth-check">
                  <input type="checkbox" defaultChecked />
                  <span>
                    {mode === 'login'
                      ? 'Recordar sesión en este equipo'
                      : 'Acepto la política de privacidad visual'}
                  </span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="auth-forgot-btn"
                    onClick={() =>
                      onDemoAction?.(
                        'Recuperar contraseña (visual)',
                        'Enlace estético de demostración.'
                      )
                    }
                  >
                    ¿Olvidaste la clave?
                  </button>
                )}
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                {mode === 'login' ? 'Entrar' : 'Registrarme'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


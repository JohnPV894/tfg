import { AlertTriangle, Database, Loader2, RefreshCw } from 'lucide-react';
import './StatusFeedback.css';

export function LoadingState({ message = 'Cargando productos reales desde MongoDB...' }) {
  return (
    <div className="status-card status-card--loading" role="status">
      <Loader2 size={32} className="status-spinner" />
      <div>
        <h3 className="status-card__title">Conectando con la base de datos</h3>
        <p className="status-card__text">{message}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="status-card status-card--error" role="alert">
      <div className="status-card__icon-wrap">
        <AlertTriangle size={28} />
      </div>
      <div className="status-card__body">
        <h3 className="status-card__title">No se pudieron cargar los productos desde MongoDB</h3>
        <p className="status-card__text">{message}</p>
        <p className="status-card__hint">
          Comprueba la conexión con el servidor y la base de datos.
        </p>
        {onRetry && (
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            <RefreshCw size={16} />
            Reintentar conexión
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyDatabaseState({ onRetry }) {
  return (
    <div className="status-card status-card--empty">
      <div className="status-card__icon-wrap">
        <Database size={28} />
      </div>
      <div className="status-card__body">
        <h3 className="status-card__title">Conexión correcta, colección sin productos</h3>
        <p className="status-card__text">
          La conexión con MongoDB está activa, pero la colección <code>products</code> todavía no contiene documentos.
        </p>
        <p className="status-card__hint">
          Ejecuta <code>npm run seed</code> dentro de la carpeta <code>backend</code> para insertar los productos de ejemplo.
        </p>
        {onRetry && (
          <button type="button" className="btn btn-outline" onClick={onRetry}>
            <RefreshCw size={16} />
            Volver a consultar
          </button>
        )}
      </div>
    </div>
  );
}


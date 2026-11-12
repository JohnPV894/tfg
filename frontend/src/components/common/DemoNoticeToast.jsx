import { Info, X } from 'lucide-react';
import './DemoNoticeToast.css';

export default function DemoNoticeToast({ notice, onClose }) {
  if (!notice) return null;

  return (
    <div className="demo-toast" role="status" aria-live="polite">
      <div className="demo-toast__icon">
        <Info size={18} />
      </div>
      <div className="demo-toast__content">
        <strong className="demo-toast__title">{notice.title}</strong>
        <p className="demo-toast__message">{notice.message}</p>
      </div>
      <button
        type="button"
        className="demo-toast__close"
        onClick={onClose}
        aria-label="Cerrar aviso"
      >
        <X size={16} />
      </button>
    </div>
  );
}


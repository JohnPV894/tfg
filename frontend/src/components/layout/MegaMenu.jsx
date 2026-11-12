import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Cpu,
  HardDrive,
  Keyboard,
  Laptop,
  Monitor,
  Network,
  Wrench,
} from 'lucide-react';
import './MegaMenu.css';

const MEGA_CATEGORIES = [
  {
    id: 'ordenadores',
    name: 'Ordenadores y Portátiles',
    icon: Laptop,
    subcategories: [
      'Portátiles Gaming',
      'Ultrabooks y Trabajo',
      'PC Sobremesa Workstation',
      'Mini PCs Compactos',
      'Estaciones All-in-One',
      'Servidores Torre',
    ],
    featuredPromo: 'Hasta -15% en portátiles Intel Core y RTX Series',
  },
  {
    id: 'componentes',
    name: 'Componentes para PC',
    icon: Cpu,
    subcategories: [
      'Tarjetas Gráficas RTX / Radeon',
      'Procesadores AMD Ryzen e Intel Core',
      'Placas Base ATX y Micro-ATX',
      'Memorias RAM DDR5 / DDR4',
      'Fuentes de Alimentación 80+ Gold',
      'Cajas ATX y Refrigeración Líquida',
    ],
    featuredPromo: 'Componentes certificados con 3 años de garantía oficial',
  },
  {
    id: 'almacenamiento',
    name: 'Almacenamiento SSD y HDD',
    icon: HardDrive,
    subcategories: [
      'SSD M.2 NVMe PCIe 4.0 / 5.0',
      'SSD SATA 2.5"',
      'Discos Duros NAS Enterprise',
      'Unidades Externas USB-C',
    ],
    featuredPromo: 'Unidades NVMe hasta 7.450 MB/s en entrega inmediata',
  },
  {
    id: 'monitores',
    name: 'Monitores y Pantallas',
    icon: Monitor,
    subcategories: [
      'Monitores Gaming 165Hz / 240Hz',
      'Monitores 4K Diseño y Edición',
      'Monitores Ultrawide 34"',
      'Brazos Articulados y Soportes VESA',
    ],
    featuredPromo: 'Paneles Nano IPS y OLED calibrados de fábrica',
  },
  {
    id: 'perifericos',
    name: 'Periféricos y Oficina',
    icon: Keyboard,
    subcategories: [
      'Teclados Mecánicos TKL e Inalámbricos',
      'Ratones Esports Ultraligeros',
      'Auriculares y Micrófonos Studio',
      'Webcams 4K y Capturadoras',
      'Impresoras Láser y Multifunción',
    ],
    featuredPromo: 'Packs periféricos inalámbricos para setup pro',
  },
  {
    id: 'redes',
    name: 'Redes y Conectividad',
    icon: Network,
    subcategories: [
      'Routers Wi-Fi 6E y Wi-Fi 7',
      'Switches Gestionables Gigabit / 2.5G',
      'Sistemas Mesh para Oficina',
      'Servidores NAS Synology / QNAP',
    ],
    featuredPromo: 'Equipamiento de red para hogar avanzado y pymes',
  },
];

export default function MegaMenu({ onClose, onDemoAction }) {
  const [activeId, setActiveId] = useState(MEGA_CATEGORIES[0].id);
  const current =
    MEGA_CATEGORIES.find((cat) => cat.id === activeId) || MEGA_CATEGORIES[0];

  return (
    <div className="mega-menu-backdrop" onClick={onClose}>
      <div
        className="container mega-menu-panel"
        onClick={(e) => e.stopPropagation()}
        role="region"
        aria-label="Menú de categorías"
      >
        <div className="mega-menu-sidebar">
          {MEGA_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isSelected = category.id === current.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`mega-menu-cat-btn ${isSelected ? 'is-selected' : ''}`}
                onMouseEnter={() => setActiveId(category.id)}
                onClick={() => setActiveId(category.id)}
              >
                <span className="mega-menu-cat-btn__left">
                  <Icon size={18} />
                  <span>{category.name}</span>
                </span>
                <ChevronRight size={16} />
              </button>
            );
          })}

          <button
            type="button"
            className="mega-menu-configurator-btn"
            onClick={() => {
              onClose();
              onDemoAction?.(
                'Configurador PC (visual)',
                'Acceso estético al asistente de montaje inspirado en xcom-shop.ru.'
              );
            }}
          >
            <Wrench size={17} />
            <span>Configurador de PC a medida</span>
          </button>
        </div>

        <div className="mega-menu-content">
          <div className="mega-menu-content__header">
            <div>
              <span className="mega-menu-content__eyebrow">Categoría del catálogo</span>
              <h3>{current.name}</h3>
            </div>
            <Link to="/catalogo" className="btn btn-primary" onClick={onClose}>
              Ver catálogo completo
            </Link>
          </div>

          <div className="mega-menu-subgrid">
            {current.subcategories.map((sub) => (
              <Link
                key={sub}
                to="/catalogo"
                className="mega-menu-sublink"
                onClick={onClose}
              >
                <span>{sub}</span>
                <ChevronRight size={15} />
              </Link>
            ))}
          </div>

          <div className="mega-menu-promo-strip">
            <span className="mega-menu-promo-strip__badge">Destacado</span>
            <span>{current.featuredPromo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


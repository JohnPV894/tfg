import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cpu,
  HardDrive,
  Keyboard,
  Laptop,
  MemoryStick,
  Monitor,
  PcCase,
  CircuitBoard,
} from 'lucide-react';
import './CategoryShowcase.css';

const CATEGORY_TILES = [
  { name: 'Portátiles', subtitle: 'Gaming y Ultrabooks', icon: Laptop },
  { name: 'Tarjetas Gráficas', subtitle: 'RTX 40 / Radeon', icon: Cpu },
  { name: 'Procesadores', subtitle: 'Ryzen X3D & Core i9', icon: Cpu },
  { name: 'Sobremesa PC', subtitle: 'Equipos ensamblados', icon: PcCase },
  { name: 'Placas Base', subtitle: 'ATX Z790 & AM5', icon: CircuitBoard },
  { name: 'Memoria RAM', subtitle: 'Kits DDR5 RGB', icon: MemoryStick },
  { name: 'SSD NVMe', subtitle: 'PCIe 4.0 / 5.0', icon: HardDrive },
  { name: 'Monitores y Periféricos', subtitle: 'IPS 180Hz & Esports', icon: Monitor },
  { name: 'Teclados y Ratones', subtitle: 'Mecánicos e inalámbricos', icon: Keyboard },
];

export default function CategoryShowcase() {
  return (
    <section className="section-block">
      <div className="container">
        <div className="section-header">
          <div className="section-title-group">
            <h2 className="section-title">Categorías populares</h2>
          </div>
          <Link to="/catalogo" className="section-link">
            <span>Ver todo el catálogo</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-showcase-grid">
          {CATEGORY_TILES.slice(0, 8).map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.name} to="/catalogo" className="category-tile">
                <span className="category-tile__icon">
                  <Icon size={24} />
                </span>
                <div className="category-tile__text">
                  <strong>{cat.name}</strong>
                  <span>{cat.subtitle}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


import './BrandsStrip.css';

const PARTNER_BRANDS = [
  'ASUS ROG',
  'MSI',
  'AMD Ryzen',
  'NVIDIA GeForce',
  'Intel Core',
  'Corsair',
  'Samsung',
  'LG UltraGear',
  'Logitech G',
  'Razer',
];

export default function BrandsStrip() {
  return (
    <section className="section-block">
      <div className="container">
        <div className="brands-strip">
          <div className="brands-strip__header">
            <h3>Marcas oficiales en catálogo</h3>
            <span>Distribuidor visual de hardware de primera línea</span>
          </div>
          <div className="brands-strip__list">
            {PARTNER_BRANDS.map((brand) => (
              <div key={brand} className="brand-pill">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


# CoreByte — Demo Visual Tienda Online de Informática (TFG DAW)

Demo visual navegable de comercio electrónico especializado en ordenadores, componentes informáticos y periféricos.

## Alcance del proyecto
- **Única funcionalidad real**: conexión a MongoDB con Mongoose y lectura de productos mediante una API REST en Express (`GET /api/products`, `GET /api/products/:id`, `GET /api/health`), renderizados en React.
- **Gestión real de fallos**: si MongoDB o el backend no están disponibles, la interfaz muestra un mensaje de error claro sin sustituir los productos por datos ficticios.
- **Resto exclusivamente visual**: buscador, filtros laterales, ordenación, mega-menú de categorías, botones de añadir al carrito, vista de carrito con artículos de ejemplo y vistas de login/registro.

## Estructura
- `backend/`: API REST Node.js + Express + Mongoose (`.env` ya configurado para MongoDB local en `mongodb://127.0.0.1:27017/tfg_tienda`).
- `frontend/`: Aplicación React + Vite + React Router + CSS3.

## Variables de entorno
### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tfg_tienda
CLIENT_ORIGIN=http://localhost:5173
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## Cómo ejecutar en desarrollo
1. **Poblar la base de datos (opcional si ya tienes productos en `tfg_tienda.products`)**:
   ```bash
   cd backend
   npm run seed
   ```
2. **Arrancar el backend**:
   ```bash
   cd backend
   npm run dev
   ```
3. **Arrancar el frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
4. Abrir `http://localhost:5173` en el navegador.


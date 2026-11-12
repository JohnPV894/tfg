# CoreByte

Tienda online de ordenadores, componentes informáticos y periféricos desarrollada con React, Node.js, Express y MongoDB.

## Requisitos previos

- Node.js (v18 o superior) y npm
- Acceso a una base de datos MongoDB (instalación local o cuenta en MongoDB Atlas)

## Instalación

1. Clonar el repositorio y entrar en la carpeta del proyecto:

```bash
git clone https://github.com/JohnPV894/tfg.git
cd tfg
```

2. Instalar las dependencias del backend:

```bash
cd backend
npm install
```

3. Instalar las dependencias del frontend:

```bash
cd ../frontend
npm install
```

## Configuración

1. Crear el archivo de variables de entorno del backend a partir de la plantilla `backend/.env.example`:

```bash
cd backend
cp .env.example .env
```

Editar `backend/.env` con tus datos de conexión:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tfg_tienda
CLIENT_ORIGIN=http://localhost:5173
```

2. Crear el archivo de variables de entorno del frontend a partir de `frontend/.env.example`:

```bash
cd ../frontend
cp .env.example .env
```

Contenido de `frontend/.env`:

```env
VITE_API_URL=/api
```

## Cargar productos de ejemplo (opcional)

Si la base de datos está vacía, puedes insertar los productos iniciales ejecutando desde `backend/`:

```bash
npm run seed
```

## Ejecución en desarrollo

Abre dos terminales en la raíz del proyecto:

- **Backend** (puerto `5000`):

```bash
cd backend
npm run dev
```

- **Frontend** (puerto `5173`):

```bash
cd frontend
npm run dev
```

Una vez iniciados ambos servicios, abre `http://localhost:5173` en el navegador.

## Ejecución en producción

Para generar los archivos estáticos del frontend y servir toda la aplicación desde Express en el puerto `5000`:

```bash
cd frontend
npm run build
cd ../backend
npm start
```

## Estructura

- `backend/`: API REST con Express y modelos de Mongoose.
- `frontend/`: aplicación web con React, React Router y Vite.

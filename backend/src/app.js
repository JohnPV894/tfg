import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistDir = path.resolve(__dirname, '../../frontend/dist');
const frontendIndexFile = path.join(frontendDistDir, 'index.html');
const hasFrontendBuild = fs.existsSync(frontendIndexFile);

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.use('/api', productRoutes);

app.use('/api', (_req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: 'El endpoint solicitado no existe en esta API.',
  });
});

if (hasFrontendBuild) {
  app.use(express.static(frontendDistDir));

  app.get('*', (_req, res) => {
    res.sendFile(frontendIndexFile);
  });
} else {
  app.get('/', (_req, res) => {
    res.json({
      service: 'CoreByte API',
      endpoints: ['/api/health', '/api/products', '/api/products/:id'],
    });
  });

  app.use((_req, res) => {
    res.status(404).json({
      error: 'Ruta no encontrada',
      message: 'El recurso solicitado no existe en este servidor.',
    });
  });
}

app.use((err, _req, res, _next) => {
  console.error('Error inesperado en el servidor:', err.message);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Ha ocurrido un error inesperado al procesar la solicitud.',
  });
});

export default app;

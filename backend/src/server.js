import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.error('Advertencia inicial de MongoDB:', error.message);
    console.error(
      'El servidor Express seguirá activo devolviendo HTTP 503 hasta que MongoDB esté disponible.'
    );
  }

  app.listen(PORT, () => {
    console.log(`API CoreByte escuchando en http://localhost:${PORT}`);
  });
}

startServer();


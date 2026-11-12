import mongoose from 'mongoose';

let connectionPromise = null;

/**
 * Conecta con MongoDB usando la URI definida en variables de entorno.
 * No sustituye fallos con datos ficticios: propaga el estado real de la conexión.
 */
export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      'Falta la variable de entorno MONGO_URI. Configura backend/.env antes de iniciar el servidor.'
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 8000,
      })
      .then((conn) => {
        console.log(`MongoDB conectado: ${conn.connection.host}/${conn.connection.name}`);
        return conn.connection;
      })
      .finally(() => {
        connectionPromise = null;
      });
  }

  return connectionPromise;
}

/**
 * Garantiza que existe una conexión activa antes de ejecutar consultas.
 */
export async function ensureDatabaseReady() {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await connectDB();
    return mongoose.connection.readyState === 1;
  } catch {
    return false;
  }
}


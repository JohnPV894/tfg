import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { ensureDatabaseReady } from '../config/db.js';

/**
 * Comprueba el estado de salud del backend y la conexión real con MongoDB.
 */
export async function getHealth(_req, res) {
  const isConnected = await ensureDatabaseReady();

  if (!isConnected) {
    return res.status(503).json({
      ok: false,
      database: 'disconnected',
      message: 'La base de datos MongoDB no está disponible en este momento.',
    });
  }

  return res.status(200).json({
    ok: true,
    database: 'connected',
    name: mongoose.connection.name,
  });
}

/**
 * Obtiene todos los productos almacenados en MongoDB (solo lectura).
 */
export async function getProducts(_req, res) {
  const isConnected = await ensureDatabaseReady();

  if (!isConnected) {
    return res.status(503).json({
      error: 'Base de datos no disponible',
      message:
        'No se pudo establecer conexión con MongoDB. Verifica que el servicio esté activo y la URI configurada en backend/.env.',
    });
  }

  try {
    const products = await Product.find().sort({ createdAt: 1 }).lean();
    return res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Error al consultar productos en MongoDB:', error.message);
    return res.status(500).json({
      error: 'Error al obtener productos',
      message: 'Ocurrió un error al leer la colección de productos desde MongoDB.',
    });
  }
}

/**
 * Obtiene un producto concreto por su ObjectId desde MongoDB (solo lectura).
 */
export async function getProductById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'Identificador inválido',
      message: 'El ID de producto proporcionado no tiene un formato válido.',
    });
  }

  const isConnected = await ensureDatabaseReady();

  if (!isConnected) {
    return res.status(503).json({
      error: 'Base de datos no disponible',
      message:
        'No se pudo conectar con MongoDB para consultar el detalle del producto.',
    });
  }

  try {
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado',
        message: 'No existe ningún producto en MongoDB con el identificador indicado.',
      });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error('Error al consultar detalle de producto en MongoDB:', error.message);
    return res.status(500).json({
      error: 'Error al obtener el producto',
      message: 'Ocurrió un error al consultar el producto en MongoDB.',
    });
  }
}


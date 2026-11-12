import { Router } from 'express';
import {
  getHealth,
  getProductById,
  getProducts,
} from '../controllers/productController.js';

const router = Router();

router.get('/health', getHealth);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

export default router;


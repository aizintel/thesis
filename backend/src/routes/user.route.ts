import express from 'express';
import { addProduct, addUser, deleteProduct, deleteUser, editProduct, editUser, getAllProducts, getAllUsers } from "../controllers/user.controller"
import { protectedRoute } from '../middleware/auth.middleware';
const router = express.Router();

router.post('/add', protectedRoute, addUser);
router.delete('/delete/:id', protectedRoute, deleteUser);
router.put('/edit', protectedRoute, editUser);
router.post('/all', protectedRoute, getAllUsers);


router.post('/product/add', protectedRoute, addProduct);
router.delete('/product/delete/:id', protectedRoute,  deleteProduct);
router.put('/product/edit', protectedRoute, editProduct);
router.post('/product/all', protectedRoute, getAllProducts);

export default router;

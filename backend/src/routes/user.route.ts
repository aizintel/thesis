import express from 'express';
import { addUser, deleteUser, editUser, getAllUsers } from "../controllers/user.controller"
import { addProduct, deleteProduct, editProduct, getAllProducts } from '../controllers/product.controller';
import { protectedRoute } from '../middleware/auth.middleware';
import { addReport, deleteReport, editReport, getAllReports } from '../controllers/report.controller';
const router = express.Router();

router.post('/add', protectedRoute, addUser);
router.delete('/delete/:id', protectedRoute, deleteUser);
router.put('/edit', protectedRoute, editUser);
router.post('/all', protectedRoute, getAllUsers);


router.post('/product/add', protectedRoute, addProduct);
router.delete('/product/delete/:id', protectedRoute,  deleteProduct);
router.put('/product/edit', protectedRoute, editProduct);
router.post('/product/all', protectedRoute, getAllProducts);


router.post('/report/add', protectedRoute, addReport);
router.delete('/report/delete/:id', protectedRoute,  deleteReport);
router.put('/report/edit', protectedRoute, editReport);
router.post('/report/all', protectedRoute, getAllReports);
export default router;

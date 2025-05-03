import express from 'express';
import { addProduct, addUser, deleteProduct, deleteUser, editProduct, editUser, getAllProducts, getAllUsers } from "../controllers/user.controller"
const router = express.Router();

router.post('/add', addUser);
router.delete('/delete/:id', deleteUser);
router.put('/edit', editUser);
router.post('/all', getAllUsers);


router.post('/product/add', addProduct);
router.delete('/product/delete/:id', deleteProduct);
router.put('/product/edit', editProduct);
router.post('/product/all', getAllProducts);

export default router;

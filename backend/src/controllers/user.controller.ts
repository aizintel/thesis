import { Request, Response } from 'express';
import {
    addUser as addUserToDB,
    deleteUser as deleteUserFromDB,
    getAllUsers as getAllUsersFromDB,
    editUser as editUserInDB
} from "../config/services/user.service";
import {
    addProduct as addProductToDB,
    deleteProduct as deleteProductFromDB,
    getAllProducts as getAllProductsFromDB,
    editProduct as editProductInDB
} from "../config/services/product.service";

export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role || !status) {
        res.status(400).json({ data: { error: 'Missing required fields' } });
        return;
    }

    try {

        const user: any = addUserToDB(name, email, password, role, status);

        if (!user || !user.id) {
            res.status(400).json({ data: { error: 'Failed to create user', details: user } });
            return;
        }

        res.status(201).json({ data: user });

    } catch (err) {
        console.error('Error in user controller:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ data: { error: 'User ID is required' } });
        return;
    }

    try {
        const result = deleteUserFromDB(id);

        if (!result) {
            res.status(404).json({ data: { error: 'User not found' } });
            return;
        }

        res.status(200).json({ data: { message: 'User deleted successfully' } });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = getAllUsersFromDB();
        res.status(200).json({ data: users });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {

    const { id, name, email, role, status } = req.body;


    if (!id || !name || !email || !role || !status ) {
        res.status(400).json({ data: { error: 'Missing required fields' } });
        return;
    }

    try {
        const user = editUserInDB(parseInt(id), name, email, role, status);

        if (!user) {
            res.status(404).json({ data: { error: 'User not found' } });
            return;
        }

        res.status(200).json({ data: user });
    } catch (err) {
        console.error('Error editing user:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};



export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, sku, category, price, stock } = req.body;

    if (!name || !sku || !category || price === undefined || stock === undefined) {
        res.status(400).json({ data: { error: 'Missing required fields' } });
        return;
    }

    try {
        const product = addProductToDB(name, sku, category, price, stock);
        res.status(201).json({ data: product });
    } catch (err) {
        console.error('Error in product controller:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ data: { error: 'Product ID is required' } });
        return;
    }

    try {
        const result = deleteProductFromDB(id);

        if (!result) {
            res.status(404).json({ data: { error: 'Product not found' } });
            return;
        }

        res.status(200).json({ data: { message: 'Product deleted successfully' } });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = getAllProductsFromDB();
        res.status(200).json({ data: products });
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
    const { id, name, sku, category, price, stock } = req.body;

    if (!id || !name || !sku || !category || price === undefined || stock === undefined) {
        res.status(400).json({ data: { error: 'Missing required fields' } });
        return;
    }
    try {
        const product = editProductInDB(parseInt(id), name, sku, category, price, stock);

        if (!product) {
            res.status(404).json({ data: { error: 'Product not found' } });
            return;
        }

        res.status(200).json({ data: product });
    } catch (err) {
        console.error('Error editing product:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

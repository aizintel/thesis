import db from '../database';
import { Product, ErrorResponse } from '../models/Product';

export function addProduct(
    name: string, sku: string, category: string, price: number, stock: number
): Product | ErrorResponse {
    try {
        const stmt = db.prepare(
            'INSERT INTO products (name, sku, category, price, stock) VALUES (?, ?, ?, ?, ?)'
        );

        const info = stmt.run(name, sku, category, price, stock);
        return { id: info.lastInsertRowid as number, name, sku, category, price, stock };
    } catch (error: any) {
        console.error('Error adding product:', error.message);
        return { error: error.message };
    }
}

export function editProduct(
    id: number, name: string, sku: string, category: string, price: number, stock: number
): Product | ErrorResponse {
    try {
        const stmt = db.prepare(
            `UPDATE products
            SET name = ?, sku = ?, category = ?, price = ?, stock = ? WHERE id = ?`
        );

        const info = stmt.run(name, sku, category, price, stock, id);

        if (info.changes === 0) {
            return { error: 'Product not found or no changes made' };
        }

        return { id, name, sku, category, price, stock };
    } catch (error: any) {
        console.error('Error updating product:', error.message);
        return { error: error.message };
    }
}

export function deleteProduct(id: number | string): boolean {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
}

export function getAllProducts(): Product[] {
    const stmt = db.prepare('SELECT * FROM products');
    return stmt.all() as Product[];
}


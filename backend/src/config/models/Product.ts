export interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
}

export interface ErrorResponse {
    error: string;
}

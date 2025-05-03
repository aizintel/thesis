export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'employee' | 'manager' | 'viewer';
    status: 'active' | 'inactive';
}

export interface ErrorResponse {
    error: string;
}

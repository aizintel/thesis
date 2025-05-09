export interface Auth {
    id: string;
    email: string;
    name?: string;
    password: string;
    role: string;
}

export interface ErrorResponse {
    error: string;
}

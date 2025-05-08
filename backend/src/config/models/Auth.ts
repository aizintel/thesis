export interface Auth {
    id: string;
    email: string;
    password: string;
    role: string;
}

export interface ErrorResponse {
    error: string;
}

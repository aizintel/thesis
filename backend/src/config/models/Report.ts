export interface Report {
    id: string;             
    product: string;
    productId: string;
    reportedBy: string;
    email: string;
    issueType: string;
    description: string;
    date: Date;
    status: string;
}


export interface ErrorResponse {
    error: string;
}


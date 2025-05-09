// Common interfaces for the dashboard components

export interface Product {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  description?: string;
  supplier?: string;
  reorderPoint?: number;
  reorderQuantity?: number;
  status?: string;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  status: string;
  password?: string;
}

export interface Report {
  id: string;
  product: string;
  issue: string;
  status: 'pending' | 'reviewed' | 'resolved';
  date: Date;
  submittedBy: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  resolution: string;
  comments: ReportComment[];
}

export interface ReportComment {
  user: string;
  text: string;
  date: Date;
}

export interface Stock extends Product {
  // Stock extends Product with additional properties
}

export interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface ActivityItem {
  icon: any;
  title: string;
  description: string;
  time: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'maker' | 'checker';
  name: string;
  avatar?: string;
}

export interface Product {
  id: string;
  vendorCode: string;
  category: string;
  description: string;
  count: number;
  cost: number;
  currency: string;
  expiryDate: string;
  warehouseStock: number;
  shelfStock: number;
  threshold: number;
  barcode?: string;
  status: 'active' | 'damaged' | 'expired' | 'low-stock';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  approvedBy?: string;
  approved: boolean;
}

export interface Invoice {
  id: string;
  vendorCode: string;
  products: Product[];
  totalAmount: number;
  currency: string;
  status: 'pending' | 'approved' | 'sent';
  createdAt: string;
  dueDate: string;
}

export interface Alert {
  id: string;
  type: 'low-stock' | 'expiry-warning' | 'damaged-goods';
  productId: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  acknowledged: boolean;
}

export interface FileUpload {
  id: string;
  filename: string;
  totalRows: number;
  totalAmount: number;
  timestamp: string;
  hashCode: string;
  status: 'pending' | 'processed' | 'failed';
  uploadedBy: string;
  processedAt?: string;
}
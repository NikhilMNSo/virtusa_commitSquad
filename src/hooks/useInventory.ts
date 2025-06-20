import { useState, useEffect } from 'react';
import { Product, Alert, Invoice } from '../types';
import { addDays, isAfter, isBefore } from 'date-fns';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    vendorCode: 'VND001',
    category: 'Dairy',
    description: 'Fresh Milk 1L',
    count: 120,
    cost: 3.99,
    currency: 'USD',
    expiryDate: '2024-01-15',
    warehouseStock: 80,
    shelfStock: 40,
    threshold: 20,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'maker',
    approved: true,
    approvedBy: 'checker'
  },
  {
    id: '2',
    vendorCode: 'VND002',
    category: 'Fruits',
    description: 'Organic Apples 2lb',
    count: 45,
    cost: 5.99,
    currency: 'USD',
    expiryDate: '2024-01-12',
    warehouseStock: 25,
    shelfStock: 20,
    threshold: 50,
    status: 'low-stock',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'maker',
    approved: true,
    approvedBy: 'checker'
  },
  {
    id: '3',
    vendorCode: 'VND003',
    category: 'Vegetables',
    description: 'Fresh Spinach 1lb',
    count: 30,
    cost: 2.99,
    currency: 'USD',
    expiryDate: '2024-01-10',
    warehouseStock: 15,
    shelfStock: 15,
    threshold: 25,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'maker',
    approved: false
  }
];

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [invoices] = useState<Invoice[]>([]);
  const [isLoading] = useState(false);

  useEffect(() => {
    generateAlerts();
  }, [products]);

  const generateAlerts = () => {
    const newAlerts: Alert[] = [];
    const today = new Date();
    const warningDate = addDays(today, 3);

    products.forEach(product => {
      // Low stock alert
      if (product.count < product.threshold) {
        newAlerts.push({
          id: `low-stock-${product.id}`,
          type: 'low-stock',
          productId: product.id,
          message: `${product.description} is running low (${product.count} remaining)`,
          severity: product.count < product.threshold * 0.5 ? 'high' : 'medium',
          createdAt: new Date().toISOString(),
          acknowledged: false
        });
      }

      // Expiry warning alert
      const expiryDate = new Date(product.expiryDate);
      if (isAfter(expiryDate, today) && isBefore(expiryDate, warningDate)) {
        newAlerts.push({
          id: `expiry-${product.id}`,
          type: 'expiry-warning',
          productId: product.id,
          message: `${product.description} expires on ${product.expiryDate}`,
          severity: 'high',
          createdAt: new Date().toISOString(),
          acknowledged: false
        });
      }
    });

    setAlerts(newAlerts);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product
      )
    );
  };

  const approveProduct = (productId: string, approvedBy: string) => {
    updateProduct(productId, { approved: true, approvedBy });
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const moveStock = (productId: string, fromWarehouse: number, toShelf: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
              ...product,
              warehouseStock: product.warehouseStock - fromWarehouse,
              shelfStock: product.shelfStock + toShelf,
              updatedAt: new Date().toISOString()
            }
          : product
      )
    );
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  return {
    products,
    alerts,
    invoices,
    isLoading,
    updateProduct,
    approveProduct,
    addProduct,
    moveStock,
    acknowledgeAlert
  };
};
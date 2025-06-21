# eMart Inventory Management System

A modern, full-stack inventory management system built with React, TypeScript, and Node.js. This application provides comprehensive inventory tracking, user management, and business intelligence features for e-commerce and retail operations.

## 🚀 Features

### Core Functionality
- **Product Management**: Add, edit, and track inventory items with detailed product information
- **Stock Tracking**: Real-time monitoring of warehouse and shelf stock levels
- **Alert System**: Automated alerts for low stock, expiry warnings, and damaged goods
- **User Authentication**: Role-based access control (Admin, Maker, Checker)
- **Dashboard Analytics**: Real-time statistics and business insights
- **Invoice Management**: Generate and track purchase invoices
- **File Upload**: Bulk import inventory data via CSV/Excel files
- **Approval Workflow**: Maker-Checker approval system for inventory changes

### Advanced Features
- **Barcode Integration**: Support for barcode scanning and tracking
- **Expiry Date Management**: Automated alerts for products nearing expiration
- **Multi-currency Support**: Handle transactions in different currencies
- **Reporting**: Comprehensive reports and analytics
- **Audit Trail**: Complete history of all inventory changes
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Date-fns** - Date manipulation

### Backend (Ready)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend development
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cors** - Cross-origin resource sharing

### Database
- **PostgreSQL** - Primary relational database
- **Redis** - Caching and session storage
- **Prisma** - Database ORM and migrations

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'maker', 'checker')),
  name VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_code VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  cost DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  expiry_date DATE,
  warehouse_stock INTEGER NOT NULL DEFAULT 0,
  shelf_stock INTEGER NOT NULL DEFAULT 0,
  threshold INTEGER NOT NULL DEFAULT 10,
  barcode VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'damaged', 'expired', 'low-stock')),
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_code VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'sent')),
  due_date DATE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Invoice_Items Table
```sql
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Alerts Table
```sql
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('low-stock', 'expiry-warning', 'damaged-goods')),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  severity VARCHAR(10) NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  acknowledged BOOLEAN DEFAULT false,
  acknowledged_by UUID REFERENCES users(id),
  acknowledged_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### File_Uploads Table
```sql
CREATE TABLE file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  total_rows INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  hash_code VARCHAR(64) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
  uploaded_by UUID REFERENCES users(id),
  processed_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emart-inventory-management
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd project
   npm install
   
   # Install backend dependencies (if backend is in separate directory)
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Frontend (.env)
   VITE_API_URL=http://localhost:3001/api
   VITE_APP_NAME=eMart Inventory
   
   # Backend (.env)
   DATABASE_URL="postgresql://username:password@localhost:5432/emart_inventory"
   REDIS_URL="redis://localhost:6379"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3001
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Create database
   createdb emart_inventory
   
   # Run migrations
   cd backend
   npx prisma migrate dev
   
   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend development server
   cd ../project
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
```json
{
  "username": "admin",
  "password": "password123"
}
```

#### POST /api/auth/logout
```json
{
  "token": "jwt-token"
}
```

### Product Endpoints

#### GET /api/products
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term
- `category`: Filter by category
- `status`: Filter by status

#### POST /api/products
```json
{
  "vendorCode": "VEND001",
  "category": "Electronics",
  "description": "Wireless Headphones",
  "count": 100,
  "cost": 29.99,
  "currency": "USD",
  "expiryDate": "2024-12-31",
  "warehouseStock": 80,
  "shelfStock": 20,
  "threshold": 10,
  "barcode": "1234567890123"
}
```

#### PUT /api/products/:id
Update product information

#### DELETE /api/products/:id
Delete product (soft delete)

### Invoice Endpoints

#### GET /api/invoices
#### POST /api/invoices
#### PUT /api/invoices/:id/approve
#### DELETE /api/invoices/:id

### Alert Endpoints

#### GET /api/alerts
#### PUT /api/alerts/:id/acknowledge
#### DELETE /api/alerts/:id

### File Upload Endpoints

#### POST /api/upload
Upload CSV/Excel file for bulk import

#### GET /api/upload
Get upload history

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run test         # Run tests
npm run migrate      # Run database migrations
npm run seed         # Seed database
```

### Code Structure

```
project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── dist/             # Build output

backend/
├── src/
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── prisma/           # Database schema and migrations
└── tests/            # Test files
```

## 🧪 Testing

```bash
# Run frontend tests
npm run test

# Run backend tests
cd backend
npm run test

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Build production images
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

3. Set up production environment variables
4. Run database migrations
5. Start the application with PM2 or similar process manager

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

## 🔄 Version History

- **v1.0.0** - Initial release with core inventory management features
- **v1.1.0** - Added approval workflow and enhanced reporting
- **v1.2.0** - Implemented file upload and bulk import functionality

---

**Built with ❤️ by the eMart Development Team** 
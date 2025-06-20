import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Upload, 
  AlertTriangle, 
  BarChart3,
  CheckSquare,
  Settings
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'maker', 'checker'] },
  { name: 'Inventory', href: '/inventory', icon: Package, roles: ['admin', 'maker', 'checker'] },
  { name: 'Pending Approval', href: '/approval', icon: CheckSquare, roles: ['checker', 'admin'] },
  { name: 'File Upload', href: '/upload', icon: Upload, roles: ['admin', 'maker'] },
  { name: 'Invoices', href: '/invoices', icon: FileText, roles: ['admin', 'checker'] },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle, roles: ['admin', 'maker', 'checker'] },
  { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['admin'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

export const Sidebar = () => {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {filteredNavigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors`}
                />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
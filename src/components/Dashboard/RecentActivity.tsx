import React from 'react';
import { Package, ArrowRight, Check, Upload } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'stock_move',
    message: 'Moved 20 units of Fresh Milk from warehouse to shelf',
    user: 'John Doe',
    timestamp: '2 hours ago',
    icon: ArrowRight,
    color: 'text-primary-600'
  },
  {
    id: 2,
    type: 'approval',
    message: 'Approved inventory batch INV-2024-001',
    user: 'Sarah Wilson',
    timestamp: '4 hours ago',
    icon: Check,
    color: 'text-success-600'
  },
  {
    id: 3,
    type: 'upload',
    message: 'Uploaded new inventory file (150 items)',
    user: 'Mike Johnson',
    timestamp: '6 hours ago',
    icon: Upload,
    color: 'text-warning-600'
  },
  {
    id: 4,
    type: 'new_product',
    message: 'Added new product: Organic Spinach',
    user: 'Lisa Chen',
    timestamp: '8 hours ago',
    icon: Package,
    color: 'text-primary-600'
  }
];

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.message}
              </p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span>{activity.user}</span>
                <span className="mx-1">•</span>
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};
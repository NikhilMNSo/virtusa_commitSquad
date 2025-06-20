import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useInventory } from '../../hooks/useInventory';
import { Alert } from '../../types';

const AlertIcon = ({ type }: { type: Alert['type'] }) => {
  switch (type) {
    case 'low-stock':
      return <AlertTriangle className="w-4 h-4 text-warning-600" />;
    case 'expiry-warning':
      return <Clock className="w-4 h-4 text-error-600" />;
    case 'damaged-goods':
      return <AlertTriangle className="w-4 h-4 text-error-600" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-gray-600" />;
  }
};

const severityColors = {
  low: 'border-gray-200 bg-gray-50',
  medium: 'border-warning-200 bg-warning-50',
  high: 'border-error-200 bg-error-50'
};

export const AlertsList = () => {
  const { alerts, acknowledgeAlert } = useInventory();
  const recentAlerts = alerts.slice(0, 5);

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
          <p className="text-gray-500">No active alerts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        <span className="bg-error-100 text-error-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.filter(a => !a.acknowledged).length} active
        </span>
      </div>
      
      <div className="space-y-3">
        {recentAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border ${severityColors[alert.severity]} ${
              alert.acknowledged ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertIcon type={alert.type} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {!alert.acknowledged && (
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                >
                  Acknowledge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
            View all alerts ({alerts.length})
          </button>
        </div>
      )}
    </div>
  );
};
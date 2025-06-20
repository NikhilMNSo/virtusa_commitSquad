import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: typeof LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'bg-primary-50',
    icon: 'text-primary-600',
    accent: 'border-primary-200'
  },
  green: {
    bg: 'bg-success-50',
    icon: 'text-success-600',
    accent: 'border-success-200'
  },
  yellow: {
    bg: 'bg-warning-50',
    icon: 'text-warning-600',
    accent: 'border-warning-200'
  },
  red: {
    bg: 'bg-error-50',
    icon: 'text-error-600',
    accent: 'border-error-200'
  }
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  const colors = colorClasses[color];

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border ${colors.accent} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${
              changeType === 'positive' ? 'text-success-600' :
              changeType === 'negative' ? 'text-error-600' : 'text-gray-500'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
};
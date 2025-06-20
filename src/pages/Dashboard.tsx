import { Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { AlertsList } from '../components/Dashboard/AlertsList';
import { RecentActivity } from '../components/Dashboard/RecentActivity';
import { useInventory } from '../hooks/useInventory';

export const Dashboard = () => {
  const { products, alerts } = useInventory();
  
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.status === 'low-stock').length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;
  const totalValue = products.reduce((sum, p) => sum + (p.cost * p.count), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your inventory management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          change="+12% from last month"
          changeType="positive"
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockProducts}
          change={lowStockProducts > 0 ? "Needs attention" : "All good"}
          changeType={lowStockProducts > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
          color="yellow"
        />
        <StatsCard
          title="Active Alerts"
          value={activeAlerts}
          change={activeAlerts > 0 ? "Requires action" : "No issues"}
          changeType={activeAlerts > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Inventory Value"
          value={`$${totalValue.toFixed(2)}`}
          change="+8% from last month"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertsList />
        <RecentActivity />
      </div>
    </div>
  );
};
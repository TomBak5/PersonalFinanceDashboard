import React from 'react';
import { useFinanceStore } from '../../store/financeStore';

const Assets: React.FC = () => {
  const { assets } = useFinanceStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'cash': return '💰';
      case 'investment': return '📈';
      case 'property': return '🏠';
      case 'crypto': return '₿';
      default: return '💼';
    }
  };

  const getPerformanceColor = (value: number) => {
    return value >= 0 ? 'text-success-600' : 'text-danger-600';
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Portfolio</h1>
          <p className="text-gray-600 mt-1">Monitor your investments and asset performance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Portfolio Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getAssetTypeIcon(asset.type)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{asset.type}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Value</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatCurrency(asset.value)}
                </span>
              </div>
              
              {asset.performance && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">1 Day</span>
                    <span className={`text-xs font-medium ${getPerformanceColor(asset.performance.change1d)}`}>
                      {formatPercentage(asset.performance.change1d)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">7 Days</span>
                    <span className={`text-xs font-medium ${getPerformanceColor(asset.performance.change7d)}`}>
                      {formatPercentage(asset.performance.change7d)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">30 Days</span>
                    <span className={`text-xs font-medium ${getPerformanceColor(asset.performance.change30d)}`}>
                      {formatPercentage(asset.performance.change30d)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">1 Year</span>
                    <span className={`text-xs font-medium ${getPerformanceColor(asset.performance.change1y)}`}>
                      {formatPercentage(asset.performance.change1y)}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Last Updated</span>
                  <span>{new Date(asset.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {assets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assets tracked yet. Add your first asset to start monitoring your portfolio!</p>
        </div>
      )}
    </div>
  );
};

export default Assets; 
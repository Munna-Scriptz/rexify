import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ 
  icon, 
  title, 
  value, 
  unit = "", 
  trendValue = "", 
  trendLabel = "this month",
  variant = "accent"
}) => {
  const variants = {
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    rose: "bg-rose-500/10 text-rose-500",
    neutral: "bg-surface text-text-muted"
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-border flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:shadow-lg group">
      {/* Header Area */}
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${variants[variant]}`}>
          {icon}
        </div>
        <h3 className="text-brand font-bold text-base font-space">{title}</h3>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-coil/95 font-bold text-4xl font-space">{value}</span>
          {unit && <span className="text-text-muted text-sm font-medium">{unit}</span>}
        </div>

        {/* ------- Trend value */}
        {trendValue && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${variants.success}`}>
              <TrendingUp size={12} />
            </span>
            <p className="text-sm font-medium text-text-secondary">
              <span className="text-success font-bold">{trendValue}</span> {trendLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

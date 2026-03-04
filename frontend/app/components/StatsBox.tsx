'use client';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
  icon?: string;
}

interface StatsBoxProps {
  // Support single stat props (legacy)
  label?: string;
  value?: string;
  icon?: string;
  // Support array of stats (new usage)
  stats?: Stat[];
  // Styling
  layout?: 'grid-2' | 'grid-3' | 'grid-4' | 'row';
  backgroundColor?: string;
  paddingY?: string;
  animation?: string;
  delay?: number;
  className?: string;
  [key: string]: any;
}

export default function StatsBox({
  label,
  value,
  icon,
  stats,
  layout = 'grid-4',
  backgroundColor = 'bg-white dark:bg-gray-800',
  paddingY = 'py-12',
  animation,
  delay = 0,
  className = '',
}: StatsBoxProps) {
  // Normalize: if single stat mode, wrap in array
  const items: Stat[] = stats || (label && value ? [{ label, value, icon }] : []);

  const gridClass = {
    'grid-2': 'grid-cols-2',
    'grid-3': 'grid-cols-2 md:grid-cols-3',
    'grid-4': 'grid-cols-2 md:grid-cols-4',
    'row': 'flex flex-wrap justify-center',
  }[layout] || 'grid-cols-2 md:grid-cols-4';

  return (
    <div className={`${paddingY} px-6 ${backgroundColor} ${className}`}>
      <div className={`max-w-6xl mx-auto grid ${gridClass} gap-6`}>
        {items.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay + i * 0.1 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 hover:scale-105 transition-transform shadow-lg"
          >
            {stat.icon && (
              <span className="text-4xl mb-3">{stat.icon}</span>
            )}
            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-blue-50 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
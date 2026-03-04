'use client';
import { motion } from 'framer-motion';

interface CTAProps {
  heading: string;
  subheading?: string;
  ctaText: string;
  href: string;
  // Support bg, backgroundColor, variant
  bg?: string;
  backgroundColor?: string;
  variant?: 'sm' | 'md' | 'lg' | 'xl' | 'large' | 'full-width';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animation?: string;
  delay?: number;
  pattern?: boolean;
  textColor?: string;
  paddingY?: string;
  className?: string;
  [key: string]: any;
}

export default function CTA({
  heading,
  subheading,
  ctaText,
  href,
  bg,
  backgroundColor,
  variant,
  size,
  animation = 'fadeInUp',
  delay = 0,
  pattern = false,
  paddingY = 'py-16',
  className = '',
}: CTAProps) {
  // Resolve background
  const resolvedBg = bg || backgroundColor || 'bg-gradient-to-r from-blue-600 to-purple-700';

  // Resolve sizing from variant or size
  const resolvedSize = (() => {
    if (variant === 'large' || variant === 'full-width') return 'xl';
    if (size) return size;
    return 'lg';
  })();

  const sizes = {
    sm: { heading: 'text-xl sm:text-2xl', sub: 'text-base', button: 'px-5 py-2.5 text-sm' },
    md: { heading: 'text-2xl sm:text-3xl', sub: 'text-lg', button: 'px-6 py-3' },
    lg: { heading: 'text-3xl sm:text-4xl', sub: 'text-xl', button: 'px-8 py-4 text-lg' },
    xl: { heading: 'text-4xl sm:text-5xl', sub: 'text-xl', button: 'px-10 py-5 text-xl' },
  };

  const s = sizes[resolvedSize as keyof typeof sizes] || sizes.lg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`relative overflow-hidden text-white text-center ${paddingY} px-6 ${resolvedBg} ${variant === 'full-width' ? 'w-full' : 'rounded-2xl'} ${className}`}
    >
      {pattern && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          className={`${s.heading} font-black mb-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        >
          {heading}
        </motion.h2>

        {subheading && (
          <motion.p
            className={`${s.sub} mb-8 text-white/80 max-w-2xl mx-auto font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            {subheading}
          </motion.p>
        )}

        <motion.a
          href={href}
          className={`inline-block bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl ${s.button}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaText}
        </motion.a>
      </div>
    </motion.div>
  );
}
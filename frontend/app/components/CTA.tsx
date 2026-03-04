'use client';
import { motion } from 'framer-motion';

interface CTAProps {
  heading: string;
  subheading?: string;
  ctaText: string;
  href: string;
  showInput?: boolean;
  inputPlaceholder?: string;
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
  showInput = false,
  inputPlaceholder = "Enter your email...",
  bg,
  backgroundColor,
  variant,
  size,
  animation = 'fadeInUp',
  delay = 0,
  pattern = false,
  paddingY = 'py-20',
  className = '',
}: CTAProps) {
  // Resolve background
  const resolvedBg = bg || backgroundColor || 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700';

  // Resolve sizing from variant or size
  const resolvedSize = (() => {
    if (variant === 'large' || variant === 'full-width') return 'xl';
    if (size) return size;
    return 'lg';
  })();

  const sizes = {
    sm: { heading: 'text-2xl', sub: 'text-base', button: 'px-5 py-2.5 text-sm' },
    md: { heading: 'text-3xl', sub: 'text-lg', button: 'px-6 py-3' },
    lg: { heading: 'text-4xl sm:text-5xl', sub: 'text-xl', button: 'px-8 py-4 text-lg' },
    xl: { heading: 'text-5xl sm:text-6xl', sub: 'text-xl', button: 'px-10 py-5 text-xl' },
  };

  const s = sizes[resolvedSize as keyof typeof sizes] || sizes.lg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`relative overflow-hidden text-white text-center ${paddingY} px-6 ${resolvedBg} ${variant === 'full-width' ? 'w-full' : 'rounded-3xl'} ${className} shadow-2xl`}
    >
      {pattern && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          className={`${s.heading} font-black mb-6 tracking-tight drop-shadow-md`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
        >
          {heading}
        </motion.h2>

        {subheading && (
          <motion.p
            className={`${s.sub} mb-10 text-white/90 max-w-2xl mx-auto font-medium leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            {subheading}
          </motion.p>
        )}

        <motion.div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${showInput ? 'max-w-md mx-auto' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        >
          {showInput && (
            <input
              type="email"
              placeholder={inputPlaceholder}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
            />
          )}
          <motion.a
            href={href}
            className={`inline-block bg-white text-gray-900 font-black rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all shadow-2xl whitespace-nowrap ${s.button}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => { if (href === '#') { e.preventDefault(); alert('🚀 Success! Thank you for joining the waitlist.'); } }}
          >
            {ctaText}
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
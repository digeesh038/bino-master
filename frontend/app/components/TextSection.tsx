'use client';
import { motion } from 'framer-motion';

interface ButtonProp {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface TextSectionProps {
  title: string;
  subtitle?: string;
  text?: string;
  // Support both 'align' and 'alignment' props
  align?: 'left' | 'center' | 'right';
  alignment?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: string;
  animation?: string;
  delay?: number;
  className?: string;
  maxWidth?: string;
  paddingY?: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  imageAlt?: string;
  buttons?: ButtonProp[];
  [key: string]: any;
}

export default function TextSection({
  title,
  subtitle,
  text,
  align,
  alignment,
  size = 'md',
  gradient,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  maxWidth = 'max-w-4xl',
  paddingY = 'py-12',
  buttons,
}: TextSectionProps) {
  const resolvedAlign = alignment || align || 'center';

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[resolvedAlign];

  const sizes = {
    sm: { title: 'text-xl sm:text-2xl', subtitle: 'text-lg', text: 'text-sm', spacing: 'space-y-2' },
    md: { title: 'text-2xl sm:text-3xl lg:text-4xl', subtitle: 'text-xl', text: 'text-base', spacing: 'space-y-4' },
    lg: { title: 'text-3xl sm:text-4xl lg:text-5xl', subtitle: 'text-2xl', text: 'text-lg', spacing: 'space-y-6' },
    xl: { title: 'text-4xl sm:text-5xl lg:text-6xl', subtitle: 'text-2xl', text: 'text-xl', spacing: 'space-y-8' },
  };

  const s = sizes[size as keyof typeof sizes] || sizes.md;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`${paddingY} px-6 ${alignClass} ${maxWidth} mx-auto ${s.spacing} ${className}`}
    >
      <motion.h2
        className={`${s.title} font-black tracking-tight leading-[1.1] ${gradient
          ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
          : 'text-gray-900 dark:text-white'
          }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.h3
          className={`${s.subtitle} text-gray-600 dark:text-blue-50 font-medium`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {subtitle}
        </motion.h3>
      )}

      {text && (
        <motion.p
          className={`${s.text} text-gray-700 dark:text-white/90 leading-relaxed max-w-2xl mx-auto`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        >
          {text}
        </motion.p>
      )}

      {buttons && buttons.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${btn.variant === 'secondary'
                ? 'bg-white/10 border border-white/30 text-white backdrop-blur hover:bg-white/20'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                }`}
            >
              {btn.text}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
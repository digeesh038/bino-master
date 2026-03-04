'use client';
import { motion } from 'framer-motion';

interface CardItem {
  title: string;
  description?: string;
  image?: string;
  linkText?: string;
  linkHref?: string;
  variant?: string;
  animation?: string;
  hoverEffect?: string;
  gradientColors?: string;
}

interface CardProps {
  // Single card mode
  title?: string;
  description?: string;
  image?: string;
  buttonLabel?: string;
  href?: string;
  variant?: 'default' | 'glass' | 'minimal' | 'gradient';
  animation?: 'hover' | 'float' | 'tilt' | 'scale' | 'none';
  delay?: number;
  gradientColors?: string;
  className?: string;
  // Multi card grid mode (from JSON)
  cards?: CardItem[];
  columns?: number;
  gap?: string;
  paddingY?: string;
  backgroundColor?: string;
  textColor?: string;
  [key: string]: any;
}

function SingleCard({
  title,
  description,
  image,
  buttonLabel,
  href,
  variant = 'default',
  animation = 'hover',
  delay = 0,
  gradientColors,
  className = '',
}: CardProps) {
  const variantClass = {
    default: 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border border-white/20 dark:border-gray-700/30',
    minimal: 'bg-transparent border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50',
    gradient: gradientColors
      ? `bg-gradient-to-br ${gradientColors} text-white`
      : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
  }[variant] || 'bg-white dark:bg-gray-800';

  const isGradient = variant === 'gradient';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={animation === 'hover' || animation === 'scale' ? { scale: 1.05, y: -5 } : animation === 'tilt' ? { rotateY: 5, rotateX: 5 } : undefined}
      transition={{ duration: 0.3, delay }}
      className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl cursor-pointer ${variantClass} ${className}`}
    >
      {image && (
        <div className="w-full h-40 mb-4 overflow-hidden rounded-xl">
          <img src={image} alt={title || ''} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className={`text-xl font-bold mb-2 ${isGradient ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-sm leading-relaxed mb-4 ${isGradient ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
          {description}
        </p>
      )}
      {(buttonLabel || href) && (
        <a
          href={href || '#'}
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all hover:scale-105"
        >
          {buttonLabel || 'Learn More'}
        </a>
      )}
    </motion.div>
  );
}

export default function Card(props: CardProps) {
  const { cards, columns = 3, gap = 'gap-8', paddingY = 'py-12', backgroundColor = '', textColor = '', ...rest } = props;

  // Multi-card grid mode
  if (cards && cards.length > 0) {
    const colClass = { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2', 3: 'grid-cols-1 md:grid-cols-3', 4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' }[columns] || 'grid-cols-1 md:grid-cols-3';

    return (
      <div className={`${paddingY} px-6 ${backgroundColor}`}>
        {(rest.title || rest.description) && (
          <div className="text-center mb-10">
            {rest.title && <h2 className={`text-3xl font-bold mb-3 ${textColor || 'text-gray-900 dark:text-white'}`}>{rest.title}</h2>}
            {rest.description && <p className={`text-lg ${textColor || 'text-gray-600 dark:text-gray-400'}`}>{rest.description}</p>}
          </div>
        )}
        <div className={`max-w-7xl mx-auto grid ${colClass} ${gap}`}>
          {cards.map((card, i) => (
            <SingleCard
              key={i}
              title={card.title}
              description={card.description}
              image={card.image}
              href={card.linkHref}
              buttonLabel={card.linkText}
              variant={card.variant as any}
              animation={card.animation as any}
              gradientColors={card.gradientColors}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    );
  }

  // Single card mode
  return <SingleCard {...rest} />;
}
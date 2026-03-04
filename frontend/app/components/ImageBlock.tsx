'use client';
import { motion } from 'framer-motion';

interface ImageBlockProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  animation?: string;
  delay?: number;
  overlay?: string | { color: string; opacity: number };
  overlayOpacity?: number;
  overlayColors?: string;
  caption?: string;
  rounded?: string;
  aspect?: 'square' | 'video' | 'wide' | 'hero' | 'auto';
  paddingY?: string;
  [key: string]: any;
}

export default function ImageBlock({
  src,
  alt,
  width = 1200,
  height = 600,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  overlay,
  overlayOpacity = 0.3,
  caption,
  aspect = 'wide',
  paddingY = '',
}: ImageBlockProps) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    hero: 'aspect-[16/7]',
    auto: '',
  }[aspect] || 'aspect-video';

  const animationVariants: Record<string, any> = {
    fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay } },
    fadeInDown: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay } },
    zoom: { initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay } },
    zoomIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay } },
    slideUp: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay } },
    none: {},
  };

  const animProps = animationVariants[animation] || animationVariants.fadeIn;
  const hasOverlay = !!overlay;

  return (
    <motion.div
      {...animProps}
      className={`relative overflow-hidden rounded-2xl group ${aspectClass} ${paddingY ? `my-8 ${paddingY}` : ''} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {hasOverlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-6 py-3 text-sm backdrop-blur-sm">
          {caption}
        </div>
      )}
    </motion.div>
  );
}
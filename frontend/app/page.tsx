"use client";

import React from 'react';
import TextSection from './components/TextSection';
import CTA from './components/CTA';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] bg-mesh transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-48 pb-24 relative z-10"
      >
        <TextSection
          title="Dynamic Pages. Reimagined."
          subtitle="Generate stunning, high-performance web pages using a simple JSON API."
          text="Bino is the missing layer between your database and your design system. We turn raw configuration data into premium user experiences instantly."
          alignment="center"
          size="xl"
          gradient="from-blue-400 via-indigo-500 to-purple-500"
          animation="fadeInUp"
          paddingY="py-10"
        />

        <div className="flex justify-center gap-6 mt-12 flex-wrap px-6">
          <button onClick={() => window.location.href = '/api'} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-blue-500/30">
            Explore Documentation
          </button>
          <button onClick={() => window.location.href = '/problem'} className="px-10 py-4 bg-white text-gray-900 border border-transparent rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
            Why We Exist
          </button>
        </div>
      </motion.div>

      {/* Features showcase */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <Card
            title="Express & MongoDB"
            description="Our newly split professional backend ensures high-speed page retrieval and persistent storage."
            variant="glass"
            animation="float"
          />
          <Card
            title="Premium Components"
            description="Animated StatsBoxes, ImageBlocks, and CTA's - all pre-styled to perfection."
            variant="gradient"
            gradientColors="from-purple-500 to-indigo-600"
            animation="scale"
          />
          <Card
            title="SEO & Performance"
            description="Built on Next.js 15 for lightning-fast loads and effortless indexing."
            variant="minimal"
            animation="hover"
          />
        </div>
      </div>

      {/* CTA section */}
      <CTA
        heading="Ready to build the future?"
        subheading="Start using our dynamic creation engine today."
        ctaText="Try Playground"
        href="/api"
        pattern={true}
        variant="full-width"
        animation="fadeInUp"
      />

      <Footer />
    </div>
  );
}
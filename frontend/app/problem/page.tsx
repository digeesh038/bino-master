"use client";

import React from 'react';
import TextSection from '../components/TextSection';
import StatsBox from '../components/StatsBox';
import CTA from '../components/CTA';
import Card from '../components/Card';
import ImageBlock from '../components/ImageBlock';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function ProblemStatementPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0d0d0d] bg-mesh transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="pt-48 pb-10 relative z-10 text-white"
            >
                <TextSection
                    title="The Problem Statement"
                    subtitle="Static workflows in a dynamic digital age."
                    text="The fundamental problem is the high friction between **content requirement** and **technical deployment**. Businesses need to launch campaigns daily, but developers are stuck in a manual loop of creating routes, writing components, and pushing code for every single new page. Bino solves this once and for all."
                    alignment="center"
                    size="xl"
                    gradient="from-red-600 via-orange-500 to-amber-400"
                    animation="fadeInDown"
                />
            </motion.div>

            {/* Visual Problem Indicator */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <ImageBlock
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
                    alt="Complex charts representing dev effort"
                    aspect="wide"
                    animation="zoom"
                    caption="The current state of fragmented development workflows."
                />
            </div>

            {/* Stats Section */}
            <div className="relative z-10 px-6">
                <StatsBox
                    stats={[
                        { label: "Lost Dev Hours", value: "1,200+", icon: "⏳" },
                        { label: "Design Drift", value: "85%", icon: "📏" },
                        { label: "Maintenance Cost", value: "$45k/yr", icon: "💰" },
                        { label: "Content Cycle", value: "14 Days", icon: "🔄" }
                    ]}
                    layout="grid-4"
                    animation="staggered-fadeInUp"
                    backgroundColor="bg-white/5 dark:bg-white/5 backdrop-blur-xl border-y border-white/10"
                    paddingY="py-24"
                    className="rounded-3xl shadow-2xl"
                />
            </div>

            {/* The Solution */}
            <div className="relative py-32 z-10">
                <TextSection
                    title="Bino: The Architecture of Speed"
                    subtitle="Dynamic schemas, static performance."
                    text="We've inverted the paradigm. By treating your UI as a set of programmable blocks stored in MongoDB, we enable marketing teams to launch pages in minutes, while developers focus on building the core design system once."
                    alignment="center"
                    size="lg"
                    gradient="from-blue-500 via-indigo-400 to-teal-400"
                    animation="fadeInUp"
                />
            </div>

            {/* Feature Cards */}
            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <Card
                        title="Headless but Visual"
                        description="The flexibility of a headless CMS with the immediate visual feedback of a custom-built site."
                        variant="glass"
                        animation="hover"
                    />
                    <Card
                        title="Dynamic Page Creation"
                        description="Post a slug + components to /api/pages and your content is instantly live. No re-builds allowed."
                        variant="gradient"
                        gradientColors="from-blue-600 to-indigo-600"
                        animation="tilt"
                    />
                    <Card
                        title="Database Driven"
                        description="Direct integration with MongoDB for persistent, secure storage of every single campaign page."
                        variant="minimal"
                        animation="float"
                    />
                </div>
            </div>

            {/* Final CTA */}
            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                <CTA
                    heading="Break the loop today."
                    subheading="Experience the power of a professional dynamic page engine. Create slugs instantly via our API."
                    ctaText="View API Documentation"
                    href="/api"
                    pattern={true}
                    variant="large"
                    animation="fadeInUp"
                    backgroundColor="bg-blue-600 shadow-3xl shadow-blue-500/20"
                    className="rounded-3xl"
                />
            </div>

            <Footer />
        </div>
    );
}

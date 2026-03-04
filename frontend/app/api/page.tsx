"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SAMPLE_PAYLOAD = {
    slug: "my-first-page",
    components: [
        {
            type: "TextSection",
            props: {
                title: "Hello from Bino!",
                subtitle: "Created via the API",
                text: "This page was generated dynamically using a POST request.",
                alignment: "center",
                gradient: "from-blue-600 to-purple-600",
                size: "lg"
            }
        },
        {
            type: "ImageBlock",
            props: {
                src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80",
                alt: "Team collaboration",
                aspect: "wide",
                animation: "zoom",
                caption: "Your dynamically generated page is live!"
            }
        },
        {
            type: "CTA",
            props: {
                heading: "You built this!",
                subheading: "This page was created entirely via a single API call.",
                ctaText: "Build Another",
                href: "/api",
                pattern: true,
                animation: "fadeInUp"
            }
        }
    ],
    metadata: {
        title: "My First Bino Page",
        description: "Created via the Bino API playground."
    }
};

const COMPONENT_DOCS = [
    { name: 'TextSection', description: 'Headings, subtitles and body text with gradient titles', props: 'title, subtitle, text, alignment, size, gradient, paddingY, buttons[]' },
    { name: 'ImageBlock', description: 'Full-width images with overlay, captions and animations', props: 'src, alt, aspect (hero/wide/video), animation, caption, overlay' },
    { name: 'Card', description: 'Feature cards with images. Supports glass, gradient, minimal variants', props: 'title, description, image, variant, animation, cards[] (multi-card mode)' },
    { name: 'StatsBox', description: 'Animated statistics grid with icons', props: 'stats[] ({label, value, icon}), layout (grid-2/3/4), backgroundColor' },
    { name: 'CTA', description: 'Call-to-action banner with pattern background', props: 'heading, subheading, ctaText, href, pattern, variant (full-width/large)' },
];

const TEMPLATES = {
    marketing: {
        slug: "marketing-launch",
        components: [
            { type: "TextSection", props: { title: "The Next Big Thing", subtitle: "Coming Soon", text: "Join the revolution today.", alignment: "center", gradient: "from-blue-600 to-indigo-600", size: "lg" } },
            { type: "CTA", props: { heading: "Save your spot", ctaText: "Join Waitlist", href: "#", pattern: true } }
        ]
    },
    product: {
        slug: "new-product",
        components: [
            { type: "TextSection", props: { title: "Bino Pro Controller", subtitle: "Elite Performance", text: "Designed for champions.", size: "xl" } },
            { type: "ImageBlock", props: { src: "https://images.unsplash.com/photo-1600080972464-8e5f35802d3e", alt: "Controller", aspect: "wide" } },
            { type: "StatsBox", props: { stats: [{ label: "Latency", value: "1ms", icon: "⚡" }, { label: "Battery", value: "40h", icon: "🔋" }], layout: "grid-2" } }
        ]
    },
    minimal: {
        slug: "clean-page",
        components: [
            { type: "TextSection", props: { title: "Simplicity is Key", text: "A minimalist approach to dynamic content.", alignment: "center" } }
        ]
    },
    premium: {
        slug: "ultra-premium",
        components: [
            { type: "TextSection", props: { title: "Experience Excellence", subtitle: "The Gold Standard", text: "Pushing the boundaries of what's possible with dynamic components.", alignment: "center", size: "xl", gradient: "from-amber-400 via-orange-500 to-red-600" } },
            { type: "ImageBlock", props: { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", alt: "Tech", aspect: "video", animation: "zoom", caption: "Hardware meets Software" } },
            { type: "Card", props: { title: "Exclusive Features", cards: [{ title: "Glass UI", variant: "glass", animation: "float" }, { title: "High Perf", variant: "gradient", gradientColors: "from-blue-600 to-purple-600" }, { title: "Next.js 15", variant: "minimal" }] } },
            { type: "StatsBox", props: { stats: [{ label: "Happy Users", value: "50k+", icon: "👥" }, { label: "Uptime", value: "99.99%", icon: "✅" }], layout: "grid-2" } },
            { type: "CTA", props: { heading: "Elevate your brand.", ctaText: "Start Premium", href: "#", variant: "large" } }
        ]
    }
};

export default function DocsPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [darkMode, setDarkMode] = useState(false);
    const [playgroundJson, setPlaygroundJson] = useState(JSON.stringify(TEMPLATES.marketing, null, 2));
    const [playgroundResult, setPlaygroundResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = async () => {
        setIsLoading(true);
        setPlaygroundResult('');
        try {
            const json = JSON.parse(playgroundJson);
            const res = await fetch('/api/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            });
            const data = await res.json();
            setPlaygroundResult(JSON.stringify(data, null, 2));
        } catch (err) {
            setPlaygroundResult('❌ Error: ' + (err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    let parsedSlug = '';
    try { parsedSlug = JSON.parse(playgroundJson).slug; } catch { }

    const tabs = [
        { id: 'overview', label: '📋 Overview' },
        { id: 'quickstart', label: '🚀 Quick Start' },
        { id: 'components', label: '🧩 Components' },
        { id: 'playground', label: '🎮 Playground' },
    ];

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <Navbar />

                {/* Hero */}
                <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white pt-40 pb-24 px-6 text-center shadow-inner relative overflow-hidden">
                    {/* Decorative blurred circles for premium depth */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-sm">Dynamic Pages API</h1>
                        <p className="text-xl md:text-2xl text-blue-50 font-medium max-w-3xl mx-auto mb-12 leading-relaxed opacity-95">
                            Turn your JSON schemas into <span className="text-yellow-400 font-black">premium live pages</span> instantly.
                            Zero deployment, infinite scale.
                        </p>

                        <div className="inline-flex bg-black/40 backdrop-blur-md rounded-3xl p-8 font-mono text-sm text-left max-w-xl w-full mx-auto border border-white/10 shadow-2xl transition-all hover:bg-black/50">
                            <pre className="text-blue-300 leading-relaxed">{`POST /api/pages
{ 
  "slug": "awesome-campaign", 
  "components": [...] 
}

→ Live at /awesome-campaign ✅`}</pre>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex gap-2 mb-10 flex-wrap">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">How it Works</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-lg">Send a JSON payload → get a live page URL. That's it.</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { step: '01', title: 'POST your JSON', desc: 'Send a slug and an array of component blocks to /api/pages.' },
                                    { step: '02', title: 'Stored in MongoDB', desc: 'The backend validates and persists your page to the database instantly.' },
                                    { step: '03', title: 'Live at /{slug}', desc: 'Your page is immediately server-rendered and accessible at the slug URL.' },
                                ].map(item => (
                                    <div key={item.step} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                        <div className="text-5xl font-black text-blue-100 dark:text-blue-900 mb-3">{item.step}</div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">POST /api/pages</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Create a new page. Returns 201 on success, 409 if slug already exists.</p>
                                </div>
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">GET /{'{slug}'}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Visits the live rendered page. Returns 404 if not found.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Start Tab */}
                    {activeTab === 'quickstart' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Quick Start</h2>
                            <div className="bg-gray-900 rounded-2xl p-6 text-sm font-mono overflow-x-auto">
                                <pre className="text-green-400">{`curl -X POST http://localhost:3000/api/pages \\
  -H "Content-Type: application/json" \\
  -d '{
    "slug": "awesome-page",
    "components": [
      {
        "type": "TextSection",
        "props": {
          "title": "My Awesome Page",
          "subtitle": "Made with Bino",
          "gradient": "from-blue-600 to-purple-600"
        }
      },
      {
        "type": "ImageBlock",
        "props": {
          "src": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          "alt": "Hero Image",
          "aspect": "wide"
        }
      },
      {
        "type": "CTA",
        "props": {
          "heading": "Ready?",
          "ctaText": "Get Started",
          "href": "/",
          "pattern": true
        }
      }
    ]
  }'`}</pre>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-800 dark:text-blue-200 text-sm">
                                💡 After running the above, visit <strong>http://localhost:3000/awesome-page</strong> to see your live page!
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <h3 className="font-bold mb-2 dark:text-white">Pre-seeded Demo Pages</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <a href="/demo-page" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">/demo-page</a>
                                    <a href="/test3" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">/test3</a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Components Tab */}
                    {activeTab === 'components' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Available Components</h2>
                            <div className="grid gap-4">
                                {COMPONENT_DOCS.map(comp => (
                                    <div key={comp.name} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <div className="flex flex-wrap items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{comp.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{comp.description}</p>
                                                <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg">{comp.props}</code>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Playground Tab */}
                    {activeTab === 'playground' && (
                        <div className="space-y-6">
                            {/* Templates Selector */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Choose a Template (Beginner Friendly)</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setPlaygroundJson(JSON.stringify(TEMPLATES.marketing, null, 2))}
                                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold hover:scale-105 transition-all"
                                    >
                                        🚀 Marketing Page
                                    </button>
                                    <button
                                        onClick={() => setPlaygroundJson(JSON.stringify(TEMPLATES.product, null, 2))}
                                        className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-bold hover:scale-105 transition-all"
                                    >
                                        🛍️ Product Showcase
                                    </button>
                                    <button
                                        onClick={() => setPlaygroundJson(JSON.stringify(TEMPLATES.minimal, null, 2))}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:scale-105 transition-all"
                                    >
                                        🧊 Minimal Design
                                    </button>
                                    <button
                                        onClick={() => setPlaygroundJson(JSON.stringify(TEMPLATES.premium, null, 2))}
                                        className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-xl text-sm font-bold hover:scale-105 transition-all"
                                    >
                                        👑 Ultra Premium
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-900 dark:text-white">Request Body (JSON)</h3>
                                    <textarea
                                        className="w-full h-96 p-4 bg-gray-900 text-green-300 rounded-2xl font-mono text-sm border-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        value={playgroundJson}
                                        onChange={(e) => setPlaygroundJson(e.target.value)}
                                        spellCheck={false}
                                    />
                                    <button
                                        onClick={sendRequest}
                                        disabled={isLoading}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 text-lg"
                                    >
                                        {isLoading ? '⏳ Creating...' : '🚀 Create Dynamic Page'}
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-900 dark:text-white">API Response</h3>
                                    <div className="w-full h-96 p-4 bg-gray-900 rounded-2xl font-mono text-sm text-green-400 overflow-auto">
                                        <pre>{playgroundResult || '// Response will appear here after you click "Create Dynamic Page"'}</pre>
                                    </div>
                                    {playgroundResult.includes('"success": true') && parsedSlug && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                                            <p className="text-green-600 dark:text-green-400 font-semibold mb-2">✅ Page created successfully!</p>
                                            <a
                                                href={`/${parsedSlug}`}
                                                className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
                                            >
                                                View /{parsedSlug} →
                                            </a>
                                        </div>
                                    )}
                                    {playgroundResult.includes('"success": false') && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                                            ❌ Request failed. Check the response for details.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* How it Works Section */}
                <div className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100 dark:border-gray-900">
                    <h2 className="text-3xl font-black mb-12 text-center dark:text-white">How to build like a Pro</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">1</div>
                            <h3 className="text-xl font-bold dark:text-white">Choose a Slug</h3>
                            <p className="text-gray-600 dark:text-gray-400">The <b>Slug</b> is your page name. Use something like <code>my-store</code>. It will appear at <code>localhost:3000/my-store</code>.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">2</div>
                            <h3 className="text-xl font-bold dark:text-white">Pick Components</h3>
                            <p className="text-gray-600 dark:text-gray-400">We use "Blocks". Want a title? Use <b>TextSection</b>. Want a big photo? Use <b>ImageBlock</b>. Just swap the text inside the quotes!</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">3</div>
                            <h3 className="text-xl font-bold dark:text-white">Launch Instantly</h3>
                            <p className="text-gray-600 dark:text-gray-400">Click create, and your page is stored in our MongoDB database forever. No coding required!</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

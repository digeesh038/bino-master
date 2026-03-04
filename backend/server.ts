import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bino-app';

// Disable buffering so we fail fast if connection is down
mongoose.set('bufferCommands', false);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB');
        seedDatabase();
    })
    .catch(err => {
        console.error('❌ MongoDB CONNECTION ERROR:', err.message);
        process.exit(1); // Force restart if no DB
    });

// Page Schema
const pageSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    components: { type: Array, required: true },
    metadata: {
        title: String,
        description: String,
        tags: [String]
    },
    createdAt: { type: Date, default: Date.now }
});

const Page = mongoose.model('Page', pageSchema);

// Seeding logic for 1-2 demo pages
const seedDatabase = async () => {
    try {
        const demoPages = [
            {
                slug: 'demo-page',
                components: [
                    { type: 'TextSection', props: { title: 'Welcome to Bino', subtitle: 'The Professional Page Engine', text: 'This is a pre-seeded demo page created automatically.', size: 'lg', gradient: 'from-blue-600 to-indigo-600' } },
                    { type: 'ImageBlock', props: { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4', alt: 'Hero', aspect: 'hero', animation: 'zoom' } },
                    { type: 'Card', props: { title: 'Dynamic Blocks', description: 'Every element you see here is a block in a JSON array.', variant: 'glass', animation: 'float' } }
                ],
                metadata: { title: 'Bino Demo' }
            },
            {
                slug: 'test3',
                components: [
                    { type: 'TextSection', props: { title: 'The Future is Dynamic', subtitle: 'Scale your marketing instantly', text: 'Bino allows you to manage hundreds of landing pages without touching code.', alignment: 'center', size: 'xl' } },
                    {
                        type: 'StatsBox',
                        props: {
                            stats: [
                                { label: 'Pages Created', value: '1,500+', icon: '📄' },
                                { label: 'Avg Speed', value: '0.4s', icon: '⚡' },
                                { label: 'User Rating', value: '4.9/5', icon: '⭐' }
                            ],
                            layout: 'grid-3'
                        }
                    },
                    {
                        type: 'Card',
                        props: {
                            title: 'Our Features',
                            description: 'Bino provides the core components you need to succeed.',
                            cards: [
                                { title: 'Fast Rendering', description: 'Next.js 15 powered', variant: 'glass' },
                                { title: 'API First', description: 'Manage with JSON', variant: 'gradient', gradientColors: 'from-purple-500 to-blue-500' },
                                { title: 'Persistent', description: 'MongoDB Secured', variant: 'minimal' }
                            ]
                        }
                    },
                    { type: 'CTA', props: { heading: 'Ready to start?', ctaText: 'Join Bino Now', href: '/api', pattern: true } }
                ],
                metadata: { title: 'Feature Showcase' }
            }
        ];

        for (const page of demoPages) {
            const exists = await Page.findOne({ slug: page.slug });
            if (!exists) {
                console.log(`Seeding demo page: ${page.slug}`);
                await Page.create(page);
            }
        }
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

// Health check for Render
app.get('/', (req, res) => {
    res.json({ status: 'Bino Backend is Live 🚀', database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' });
});

// Logs for every request in production
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.post('/api/pages', async (req, res) => {
    try {
        const { slug, components, metadata } = req.body;

        if (!slug || !components) {
            return res.status(400).json({ success: false, error: 'Slug and components are required' });
        }

        // Check if slug exists
        const existingPage = await Page.findOne({ slug });
        if (existingPage) {
            return res.status(409).json({
                success: false,
                error: { code: 'PAGE_EXISTS', message: `Page with slug '${slug}' already exists` }
            });
        }

        const newPage = new Page({ slug, components, metadata });
        await newPage.save();

        res.status(201).json({
            success: true,
            data: {
                slug,
                url: `/${slug}`,
                componentCount: components.length
            }
        });
    } catch (error) {
        console.error('Error creating page:', (error as Error).message);
        res.status(500).json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: (error as Error).message }
        });
    }
});

app.get('/api/pages/:slug', async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });
        if (!page) {
            return res.status(404).json({ success: false, error: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching page' });
    }
});

app.get('/api/pages', async (req, res) => {
    try {
        const pages = await Page.find({}, 'slug metadata createdAt').sort({ createdAt: -1 });
        res.json({ success: true, data: pages });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching pages' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

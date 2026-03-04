// app/[slug]/page.tsx

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import ImageBlock from '../components/ImageBlock';
import TextSection from '../components/TextSection';
import Card from '../components/Card';
import CTA from '../components/CTA';
import StatsBox from '../components/StatsBox';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } =  params;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  try {
    const res = await fetch(`${backendUrl}/api/pages/${slug}`, { cache: 'no-store' });
    if (!res.ok) return { title: 'Page Not Found' };
    const data = await res.json();
    return {
      title: data.metadata?.title || slug.charAt(0).toUpperCase() + slug.slice(1),
      description: data.metadata?.description || `View ${slug} on Bino Dynamic Engine`,
    };
  } catch {
    return { title: 'Bino Page' };
  }
}

const componentsMap = {
  ImageBlock,
  TextSection,
  Card,
  CTA,
  StatsBox,
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  // Fetch from our new backend
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  console.log(`[SLUG PAGE] Fetching ${slug} from ${backendUrl}/api/pages/${slug}`);

  let pageData: { components: any[]; } | null = null;
  try {
    const res = await fetch(`${backendUrl}/api/pages/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`[SLUG PAGE] Backend returned ${res.status} for ${slug}`);
      if (res.status === 404) return notFound();
      throw new Error('Failed to fetch page');
    }
    const data = await res.json();
    pageData = data;
    console.log(`[SLUG PAGE] Successfully fetched ${slug} with ${data.components?.length} components`);
  } catch (err) {
    console.error(`[SLUG PAGE] Error fetching page ${slug}:`, err);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] bg-mesh selection:bg-blue-500/30 flex flex-col relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-grow flex flex-col gap-20 pt-40 pb-32 px-6 md:px-10 max-w-screen-xl mx-auto w-full relative z-10">
        {pageData?.components?.map((block: any, i: number) => {
          const Component = componentsMap[block.type as keyof typeof componentsMap];
          if (!Component) {
            console.warn(`[SLUG PAGE] Unknown component type: ${block.type}`);
            return null;
          }
          return (
            <div
              key={i}
              className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-both"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Component {...block.props} />
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
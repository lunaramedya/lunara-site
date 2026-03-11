import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/siteData';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

export function BlogPreviewSection() {
  return (
    <SectionContainer id="blog" className="scroll-mt-24 bg-slate-50/80">
      <SectionTitle
        title="Blog"
        subtitle="Reklam, yazılım ve büyüme stratejilerine dair uygulamalı içgörüler."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden p-0 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
            <img src={post.image} alt={post.title} loading="lazy" className="h-44 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <Badge className="border-slate-200 bg-slate-100 text-slate-700">{post.category}</Badge>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">{post.title}</h3>
              <p className="text-sm text-slate-600">{post.excerpt}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
              >
                Devamını Oku <ArrowRight size={16} />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}

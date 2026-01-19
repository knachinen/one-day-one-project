import { getProjectById, getProjects } from '@/lib/projects';
import Image from 'next/image';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let project;

  try {
    project = await getProjectById(resolvedParams.id);
  } catch (error) {
    notFound();
  }

  if (!project) notFound();

  return (
    <article className="py-20 lg:py-32">
      <Link href="/work" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors mb-12 group">
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Work
      </Link>

      <header className="mb-16">
        <div className="flex gap-4 mb-6 flex-wrap">
          {project.tech_stack?.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
          {project.title}
        </h1>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
           <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Role</div>
              <div className="text-slate-900">{project.role || 'Lead Designer & Developer'}</div>
           </div>
           <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status</div>
              <div className="text-slate-900 capitalize">{project.status.replace('_', ' ')}</div>
           </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-video w-full rounded-[32px] overflow-hidden bg-slate-100 mb-16 shadow-lg">
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview</h2>
        <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap mb-12">
          {project.summary}
        </p>

        {/* Gallery Placeholder - In real app, loop through project_images */}
        {project.project_images && project.project_images.length > 0 && (
          <div className="grid gap-8 mt-16">
            {project.project_images.sort((a, b) => a.order - b.order).map((img, index) => (
              <div key={img.id || index} className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <Image src={img.image_url} alt={`Gallery ${index}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

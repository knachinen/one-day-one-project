import { getProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

export const revalidate = 3600; // Revalidate every hour

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="py-20 lg:py-32">
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
          Selected <span className="text-blue-500">Works</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          A collection of projects where I focus on clean design, performance, and user experience.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="py-20 text-center text-slate-500 border border-dashed border-slate-200 rounded-2xl">
          No projects to show yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

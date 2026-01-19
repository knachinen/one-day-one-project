import { Hero } from "@/components/home/Hero";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
  const allProjects = await getProjects();
  const recentProjects = allProjects.slice(0, 3);

  return (
    <>
      <Hero />
      
      {recentProjects.length > 0 && (
        <section className="pb-32 lg:pb-40">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Recent Projects</h2>
              <p className="text-slate-500">A selection of my latest work and experiments.</p>
            </div>
            <Link href="/work" className="hidden sm:flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all group">
              View All Work <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 sm:hidden">
            <Link href="/work" className="flex items-center justify-center gap-2 text-blue-500 font-semibold p-4 bg-white rounded-xl border border-slate-200">
              View All Work <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

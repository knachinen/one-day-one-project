import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/database';
import { Tag } from './Tag';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/work/${project.id}`} className="group block">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          {project.tech_stack?.slice(0, 2).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {project.tech_stack && project.tech_stack.length > 2 && (
             <span className="text-xs text-slate-400">+{project.tech_stack.length - 2}</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mt-1">
          {project.summary}
        </p>
      </div>
    </Link>
  );
};

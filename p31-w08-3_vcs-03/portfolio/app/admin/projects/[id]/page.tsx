'use client';

import { useEffect, useState, use } from 'react';
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/projects";
import { Project } from "@/types/database";
import { Loader2 } from "lucide-react";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(resolvedParams.id);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-20">Project not found</div>;
  }

  return (
    <div className="py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Edit Project</h1>
        <p className="text-slate-500 mt-2">Update project details</p>
      </div>
      <ProjectForm initialData={project} isEdit />
    </div>
  );
}

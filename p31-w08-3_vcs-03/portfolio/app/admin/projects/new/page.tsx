import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">New Project</h1>
        <p className="text-slate-500 mt-2">Add a new piece of work to your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  );
}

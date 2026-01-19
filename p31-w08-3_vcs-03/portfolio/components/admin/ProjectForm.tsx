'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { createProject, updateProject, uploadProjectImage } from '@/lib/projects';
import { Project } from '@/types/database';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional(),
  role: z.string().optional(),
  tech_stack: z.string().optional(), // Comma separated string for input
  status: z.enum(['in_progress', 'completed']),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialData?.thumbnail || null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || '',
      summary: initialData?.summary || '',
      role: initialData?.role || '',
      tech_stack: initialData?.tech_stack?.join(', ') || '',
      status: initialData?.status || 'completed',
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const file = e.target.files[0];
      const publicUrl = await uploadProjectImage(file);
      setThumbnailUrl(publicUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        tech_stack: data.tech_stack ? data.tech_stack.split(',').map(s => s.trim()) : [],
        thumbnail: thumbnailUrl,
      };

      if (isEdit && initialData) {
        await updateProject(initialData.id, formattedData);
      } else {
        await createProject(formattedData);
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
      
      {/* Thumbnail Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail Image</label>
        <div className="flex items-center gap-4">
          {thumbnailUrl ? (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200 group">
              <Image src={thumbnailUrl} alt="Thumbnail" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setThumbnailUrl(null)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
              {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
            </div>
          )}
          
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              disabled={uploading}
            />
            <p className="mt-1 text-xs text-slate-500">Recommended: 1200x900px, JPG/PNG</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
          <input
            {...form.register('title')}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Portfolio Website"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Summary</label>
          <textarea
            {...form.register('summary')}
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Short description of the project..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <input
              {...form.register('role')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Lead Designer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              {...form.register('status')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tech Stack</label>
          <input
            {...form.register('tech_stack')}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="React, Next.js, Tailwind CSS (comma separated)"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <Button type="button" variant="secondary" onClick={() => router.back()} className="mr-4">
          Cancel
        </Button>
        <Button type="submit" disabled={loading || uploading}>
          {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}

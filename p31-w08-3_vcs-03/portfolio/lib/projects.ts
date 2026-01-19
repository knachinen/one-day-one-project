import { supabase } from './supabase/client';
import { Project, ProjectWithImages } from '@/types/database';

// 5.1 프로젝트 목록 조회 (Public)
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'completed')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
}

// 5.2 기술 스택 필터링 (Example usage)
export async function getProjectsByTech(tech: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'completed')
      .contains('tech_stack', [tech])
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
}

// 5.3 프로젝트 상세 + 이미지 조회
export async function getProjectById(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (
        image_url,
        order
      )
    `)
    .eq('id', projectId)
    .single();

  if (error) throw error;
  return data as ProjectWithImages;
}

// 6. Admin 페이지 CRUD 흐름

// 6.1 프로젝트 생성
export async function createProject(projectData: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .insert(projectData)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

// 6.2 프로젝트 수정
export async function updateProject(projectId: string, updatedFields: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updatedFields)
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

// 6.3 프로젝트 삭제
export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) throw error;
  return true;
}

// 7. 이미지 업로드 처리
export async function uploadProjectImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(fileName, file);

  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName);

  return publicUrl;
}

// 8.1 Work 페이지 (진행중 프로젝트 포함 조회 예시)
export async function getAllProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
}

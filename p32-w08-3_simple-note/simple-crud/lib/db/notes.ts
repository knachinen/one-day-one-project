import { supabase } from "@/lib/supabaseClient";
import { Note } from "@/types/note";

// CREATE
export async function createNote(title: string, content: string) {
  const { data, error } = await supabase
    .from("notes")
    .insert({ title, content })
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

// READ (all)
export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Note[];
}

// READ (single)
export async function getNote(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// UPDATE
export async function updateNote(id: string, title: string, content: string) {
  const { data, error } = await supabase
    .from("notes")
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
}

// DELETE
export async function deleteNote(id: string) {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return true;
}

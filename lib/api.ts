import axios from "axios";
import { Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(params?: {
  page?: number;
  search?: string;
}): Promise<{ notes: Note[]; totalPages: number }> {
  const { page = 1, search = "" } = params || {};
  const { data } = await api.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    {
      params: { page, search },
    }
  );

  return {
    notes: data.notes,
    totalPages: data.totalPages ?? 1,
  };
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(
  note: Omit<Note, "id" | "createdAt">
): Promise<Note> {
  try {
    const { data } = await api.post<Note>("/notes", note);
    return data;
  } catch (err: any) {
    if (err.response?.status === 429) {
      throw new Error(
        "Too many requests. Please wait a moment before trying again."
      );
    }
    throw err;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

import axios from "axios";
import { Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(): Promise<Note[]> {
  const { data } = await api.get("/notes");
  return data.notes; // ✅ возвращаем массив Note[]
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: Omit<Note, "id" | "createdAt">) {
  const { data } = await api.post("/notes", note);
  return data;
}

export async function deleteNote(id: number) {
  await api.delete(`/notes/${id}`);
}

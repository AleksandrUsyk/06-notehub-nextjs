import axios from "axios";
import { Note } from "../types/note";

const API_URL = "https://next-docs-api.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function fetchNotes(
  search?: string,
  page = 1,
  perPage = 10
): Promise<Note[]> {
  const { data } = await api.get<Note[]>("/notes", {
    params: { search, page, per_page: perPage },
  });
  return data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNoteApi(payload: {
  title: string;
  content?: string;
  tag: Note["tag"];
}): Promise<Note> {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

export async function deleteNoteApi(id: number): Promise<void> {
  await api.delete(`/notes/${id}`);
}

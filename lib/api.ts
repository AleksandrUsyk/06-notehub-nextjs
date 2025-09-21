// import axios from "axios";
// import { Note, NoteTag } from "../types/note";

// const API_URL = "https://notehub-public.goit.study/api/notes"; // 👈 сразу /notes
// const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// export const fetchNotes = async (): Promise<Note[]> => {
//   const res = await axios.get(API_URL, {
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   });
//   return res.data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const res = await axios.get(`${API_URL}/${id}`, {
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   });
//   return res.data;
// };

// export const createNoteApi = async (payload: {
//   title: string;
//   content?: string;
//   tag: NoteTag;
// }): Promise<Note> => {
//   const res = await axios.post(API_URL, payload, {
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   });
//   return res.data;
// };

// export const deleteNoteApi = async (id: string): Promise<void> => {
//   await axios.delete(`${API_URL}/${id}`, {
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   });
// };

import axios from "axios";
import { Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Ответ API
export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
}

// Получение списка заметок
export async function fetchNotes(): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes");
  return data;
}

// Получение заметки по ID
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

// Создание новой заметки
export async function createNoteApi(payload: {
  title: string;
  content?: string;
  tag: Note["tag"];
}): Promise<Note> {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

// Удаление заметки
export async function deleteNoteApi(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}

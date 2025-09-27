import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const notesResponse = await fetchNotes({ page: 1, search: "" });

  return (
    <NotesClient
      initialNotes={notesResponse.notes}
      initialPage={1}
      totalPages={notesResponse.totalPages}
    />
  );
}

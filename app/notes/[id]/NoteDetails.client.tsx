"use client";

import { useQuery, DehydratedState } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { Note } from "../../../types/note";

interface NoteDetailsClientProps {
  id: number; // теперь id всегда number
  initialData: DehydratedState;
}

export default function NoteDetailsClient({
  id,
  initialData,
}: NoteDetailsClientProps) {
  // Ищем данные в dehydrated
  const initialNote = initialData?.queries?.find(
    (q) => q.queryKey[0] === "note" && q.queryKey[1] === id
  )?.state?.data as Note | undefined;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    initialData: initialNote,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.createdAt}</p>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: number;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error instanceof Error)
    return <p>Could not fetch note: {error.message}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}

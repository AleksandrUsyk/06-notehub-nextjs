"use client";

import {
  useQuery,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesClient.module.css";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesClientProps {
  dehydratedState?: DehydratedState | null;
}

export default function NotesClient({ dehydratedState }: NotesClientProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesInner />
    </HydrationBoundary>
  );
}

function NotesInner() {
  const { data, isLoading, error } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error instanceof Error)
    return <p>Could not fetch the list of notes. {error.message}</p>;
  if (!data || data.length === 0) return <p>No notes found.</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2>Notes</h2>
        <button onClick={() => alert("Open NoteForm")}>Create note</button>
      </div>

      <ul>
        {data.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <a href={`/notes/${note.id}`}>View details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

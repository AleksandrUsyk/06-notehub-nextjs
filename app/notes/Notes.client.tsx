"use client";

import {
  useQuery,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useState } from "react";
import css from "./NotesClient.module.css";

interface NotesClientProps {
  dehydratedState?: DehydratedState | null;
}

export default function NotesClient({ dehydratedState }: NotesClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesContent showForm={showForm} setShowForm={setShowForm} />
    </HydrationBoundary>
  );
}

function NotesContent({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}) {
  const { data, isLoading, error } = useQuery({
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
        <button className={css.button} onClick={() => setShowForm(true)}>
          Create note
        </button>
      </div>

      {showForm && <NoteForm onClose={() => setShowForm(false)} />}

      <ul className={css.notesList}>
        {data.map((note) => (
          <li key={note.id} className={css.noteItem}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <a href={`/notes/${note.id}`}>View details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

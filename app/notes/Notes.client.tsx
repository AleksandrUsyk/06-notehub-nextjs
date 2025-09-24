"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css"; // <- твои стили

export default function NotesClient() {
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
        <button className={css.button} onClick={() => alert("Create note")}>
          Create note
        </button>
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css"; // <- стили

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
    <ul className={css.list}>
      {data.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <a className={css.link} href={`/notes/${note.id}`}>
            View details
          </a>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote } from "../../lib/api";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  // mutationFn теперь принимает число, как и Note.id
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes.length) {
    return <p className={css.text}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {/* убрал note.tag, так как его нет в интерфейсе */}
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button
              className={css.button}
              onClick={() => {
                if (confirm("Delete this note?")) {
                  deleteMutation.mutate(note.id); // note.id — число
                }
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

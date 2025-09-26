"use client";

import { useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { Note } from "../../types/note";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { DehydratedState } from "@tanstack/react-query";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialNotes: Note[];
  initialPage: number;
  totalPages: number;
  dehydratedState?: DehydratedState;
}

interface NotesData {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({
  initialNotes,
  initialPage,
  totalPages,
}: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error }: UseQueryResult<NotesData, Error> = useQuery(
    {
      queryKey: ["notes", page, search],
      queryFn: () => fetchNotes({ page, search }),
      initialData: { notes: initialNotes, totalPages },
    }
  );

  const notes = data?.notes || [];
  const pages = data?.totalPages || 1;

  if (isLoading) return <p>Loading notes…</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className={css.wrapper}>
      <div className={css.actions}>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      <Pagination
        currentPage={page}
        totalPages={pages}
        onPageChange={setPage}
      />

      <div className={css.noteListWrapper}>
        <NoteList notes={notes} />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import css from "./notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page, perPage),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;
  if (notes.length === 0) return <p>No notes found.</p>;

  // Предполагаем, что API возвращает общее количество заметок в данных
  // Если API не возвращает total, можно использовать локальный расчет или заглушку
  const totalPages = Math.ceil(50 / perPage); // Замените 50 на реальное значение total, если API его возвращает

  return (
    <main className={css.container}>
      <h1>Notes</h1>
      <div className={css.controls}>
        <SearchBox value={search} onChange={setSearch} />
        <button
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create Note
        </button>
      </div>
      <NoteList notes={notes} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}

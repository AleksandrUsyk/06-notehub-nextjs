import { use } from "react";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  // Разворачиваем Promise с помощью use()
  const { id } = use(params);

  const noteId = Number(id);
  if (isNaN(noteId)) return <p>Invalid note ID</p>;

  return <NoteDetailsClient id={noteId} />;
}

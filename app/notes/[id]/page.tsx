import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const noteId = Number(id);
  if (isNaN(noteId)) return <p>Invalid note ID</p>;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <NoteDetailsClient id={noteId} dehydratedState={dehydrate(queryClient)} />
  );
}

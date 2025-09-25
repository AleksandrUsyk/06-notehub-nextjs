import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "../[id]/NoteDetails.client";

interface NoteDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function NoteDetailsPage(props: NoteDetailsPageProps) {
  const { params } = props;

  // 🔹 Ждём params, если это Promise
  const resolvedParams = params instanceof Promise ? await params : params;

  const noteId = Number(resolvedParams.id);

  if (!resolvedParams.id || isNaN(noteId)) return <p>Invalid note ID</p>;

  const queryClient = new QueryClient();

  // 🔹 Prefetch для гидратации TanStack Query
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <NoteDetailsClient id={noteId} dehydratedState={dehydrate(queryClient)} />
  );
}

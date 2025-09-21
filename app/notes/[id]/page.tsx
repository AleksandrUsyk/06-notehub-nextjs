import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, QueryClient } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const id = Number(params.id);
  const queryClient = new QueryClient();

  // prefetchQuery с правильным queryKey
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return <NoteDetailsClient id={id} initialData={dehydrate(queryClient)} />;
}

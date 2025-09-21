import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  return <NotesClient initialData={dehydrate(queryClient)} />;
}

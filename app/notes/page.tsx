// app/notes/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../notes/Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch данных для гидратации в клиентском компоненте
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

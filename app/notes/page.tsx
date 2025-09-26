import { dehydrate, QueryClient, DehydratedState } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Предзагрузка данных первой страницы
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, search: "" }),
  });

  const notesData = queryClient.getQueryData<{
    notes: any[];
    totalPages: number;
  }>(["notes", 1, ""]);

  return (
    <NotesClient
      initialNotes={notesData?.notes || []}
      initialPage={1}
      totalPages={notesData?.totalPages || 1}
      dehydratedState={dehydrate(queryClient) as DehydratedState} // приведение типа
    />
  );
}

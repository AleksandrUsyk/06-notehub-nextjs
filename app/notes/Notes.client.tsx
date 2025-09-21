// "use client";

// import { useQuery, DehydratedState } from "@tanstack/react-query";
// import { fetchNotes } from "../../lib/api";
// import { Note } from "../../types/note";

// interface NotesClientProps {
//   initialData: DehydratedState;
// }

// export default function NotesClient({ initialData }: NotesClientProps) {
//   const initialNotes = initialData?.queries?.find(
//     (q) => q.queryKey[0] === "notes"
//   )?.state?.data as Note[] | undefined;

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["notes"],
//     queryFn: fetchNotes,
//     initialData: initialNotes,
//   });

//   if (isLoading) return <p>Loading, please wait...</p>;
//   if (error)
//     return <p>Could not fetch the list of notes. {(error as Error).message}</p>;

//   return (
//     <div>
//       {data?.map((note) => (
//         <div key={note.id}>
//           <h3>{note.title}</h3>
//           <p>{note.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useQuery, DehydratedState } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "../../lib/api";
import { Note } from "../../types/note";

interface NotesClientProps {
  initialData: DehydratedState;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const initialNotes = initialData?.queries?.find(
    (q) => q.queryKey[0] === "notes"
  )?.state?.data as FetchNotesResponse | undefined;

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    initialData: initialNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch notes.</p>;

  // Безопасная проверка на массив
  const notesArray = data?.data ?? [];

  if (notesArray.length === 0) return <p>No notes found.</p>;

  return (
    <div>
      {notesArray.map((note: Note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

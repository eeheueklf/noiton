import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = await createClient();
  
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">내 노트 목록</h1>
      <ul className="list-disc pl-5">
        {notes?.map((note) => (
          <li key={note.id} className="mb-2">{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
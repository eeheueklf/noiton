interface Props {
  text: string;
  keyword: string;
}

export function HighlightText({ text, keyword }: Props) {
  
    console.log('keyword', keyword)
  
    if (!keyword.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));

  return (
    <>
      {parts.map((part, i) => (
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={i} className="text-blue-600 font-bold">
           {part}
          </span>
        ) : (
          part
        )
      ))}
    </>
  );
}
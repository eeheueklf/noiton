export function TemplateGrid({children, cols = 3}: { children: React.ReactNode; cols?: 2 | 3 }){

  const gridStyles = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  };

  return (
      <div className={`grid ${gridStyles[cols]} gap-x-8 gap-y-12`}>
        {children}
      </div>
  );
}
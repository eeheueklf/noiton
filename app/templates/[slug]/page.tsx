export default async function TemplateDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto p-8">
      <h1>템플릿 이름: {slug}</h1>
    </div>
  );
}
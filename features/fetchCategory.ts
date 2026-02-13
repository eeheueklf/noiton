export async function fetchCategory(supabase: any, currentPath?: string) {
  let categoryName = "모든";
  let subCategories: any[] = [];
  let categoryPath: any[] = [];

  if (currentPath) {
    const segments = currentPath.split('.');
    const pathsToFetch = segments.map((_, i) => segments.slice(0, i + 1).join('.'));

    const { data: pathData } = await supabase
      .from("categories")
      .select("id, name, path")
      .in("path", pathsToFetch);

    if (pathData) {
      categoryPath = pathsToFetch
        .map(p => pathData.find(d => d.path === p))
        .filter(Boolean);
      
      const currentCat = categoryPath[categoryPath.length - 1];
      categoryName = currentCat.name;

      const { data: lowCategories } = await supabase
        .from("categories")
        .select("name, slug, path")
        .eq("parent_id", currentCat.id)
        .order("name");
      
      subCategories = lowCategories || [];
    }
  } else {
    const { data: rootCategory } = await supabase
      .from("categories")
      .select("name, slug, path")
      .eq("level", 1)
      .order("name");
    subCategories = rootCategory || [];
  }

  return { categoryName, subCategories, categoryPath };
}

export function withTemplateSort(query: any, sort: string = "latest") {
  if (sort === "popular") {
    return query.order("download_count", { ascending: false });
  }
  return query.order("created_at", { ascending: false });
}
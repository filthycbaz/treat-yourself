import ReactMarkdown from "react-markdown";
import { supabaseServer } from "@/lib/supabase/server";

export default async function PostPage({ params }) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("title,content_md,cover_url,published_at")
    .eq("status", "published")
    .eq("slug", params.slug)
    .single();

  if (error || !data) return <main style={{ padding: 48 }}>Not found</main>;

  return (
    <main style={{ maxWidth: 900, margin: "48px auto" }}>
      <h1>{data.title}</h1>
      {data.cover_url && <img src={data.cover_url} alt="" style={{ width: "100%", borderRadius: 12 }} />}
      <article style={{ marginTop: 24 }}>
        <ReactMarkdown>{data.content_md}</ReactMarkdown>
      </article>
    </main>
  );
}

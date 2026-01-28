"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const run = async () => {
      setErr("");
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) {
        window.location.href = "/admin/login";
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("id,title,slug,status,updated_at")
        .order("updated_at", { ascending: false });

      if (error) setErr(error.message);
      else setPosts(data ?? []);
    };
    run();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "48px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Posts</h1>
        <a href="/admin/posts/new">+ New post</a>
      </div>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <table width="100%" cellPadding="10" style={{ marginTop: 16, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th>Title</th><th>Status</th><th>Slug</th><th>Updated</th><th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{p.title}</td>
              <td>{p.status}</td>
              <td>{p.slug}</td>
              <td>{new Date(p.updated_at).toLocaleString()}</td>
              <td><a href={`/admin/posts/${p.id}/edit`}>Edit</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

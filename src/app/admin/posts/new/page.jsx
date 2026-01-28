"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("# New post\n");
  const [status, setStatus] = useState("draft");
  const [tags, setTags] = useState("photo, reflection");
  const [coverUrl, setCoverUrl] = useState("");
  const [msg, setMsg] = useState("");

  const save = async () => {
    setMsg("");
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return (window.location.href = "/admin/login");

    const finalSlug = slug || slugify(title);
    const tagsArr = tags.split(",").map(t => t.trim()).filter(Boolean);

    const { error } = await supabase.from("posts").insert({
      user_id: auth.user.id,
      title,
      slug: finalSlug,
      content_md: content,
      cover_url: coverUrl || null,
      tags: tagsArr,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    });

    if (error) return setMsg(error.message);
    window.location.href = "/admin/posts";
  };

  return (
    <div style={{ maxWidth: 900, margin: "48px auto", display: "grid", gap: 12 }}>
      <h1>New post</h1>

      <input placeholder="Title" value={title} onChange={(e)=>{ setTitle(e.target.value); if(!slug) setSlug(slugify(e.target.value)); }} />
      <input placeholder="Slug" value={slug} onChange={(e)=>setSlug(e.target.value)} />
      <input placeholder="Cover image URL (optional)" value={coverUrl} onChange={(e)=>setCoverUrl(e.target.value)} />
      <input placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />

      <select value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option value="draft">draft</option>
        <option value="published">published</option>
      </select>

      <textarea rows={16} value={content} onChange={(e)=>setContent(e.target.value)} />

      <button onClick={save}>Save</button>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
    </div>
  );
}

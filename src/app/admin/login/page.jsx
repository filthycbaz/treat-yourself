"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    window.location.href = "/admin/posts";
  };

  return (
    <div style={{ maxWidth: 420, margin: "48px auto" }}>
      <h1>Treat Yourself — Admin</h1>
      <form onSubmit={signIn} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Sign in</button>
        {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      </form>
    </div>
  );
}


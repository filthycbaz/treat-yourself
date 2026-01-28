export default function HomePage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Treat Yourself</h1>
      <p>A personal blog for photos, reflections and writing.</p>

      <nav style={{ marginTop: 20 }}>
        <a href="/blog">Blog</a>{" | "}
        <a href="/admin/login">Admin</a>
      </nav>
    </main>
  );
}

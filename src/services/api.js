const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function apiPost(path, payload) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Cannot connect to AgriNova backend. Check that FastAPI is running at http://127.0.0.1:8000.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data.detail || data.message || `Request failed (${response.status})`;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
  return data;
}

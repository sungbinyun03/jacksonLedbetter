import { useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "jl_admin_authed_v1";

export function clearAdminAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function isAuthed() {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function AdminGate({ children }) {
  const expectedPassword = useMemo(
    () => import.meta.env.VITE_ADMIN_PASSWORD,
    []
  );

  const [authed, setAuthed] = useState(isAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (!expectedPassword) return;

    if (password === expectedPassword) {
      localStorage.setItem(AUTH_STORAGE_KEY, "1");
      setAuthed(true);
      setPassword("");
      return;
    }

    setError("Incorrect password.");
  };

  if (!expectedPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h1 className="text-lg font-bold">Admin locked</h1>
          <p className="text-sm text-gray-600 mt-2">
            No admin password is configured. Set <code>VITE_ADMIN_PASSWORD</code>{" "}
            and redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (authed) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <h1 className="text-lg font-bold">Admin</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter password to continue.
        </p>

        <label className="block text-xs font-medium text-gray-700 mt-4 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          autoFocus
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) return setError("Completá email y contraseña.");
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  const inputClass = "w-full bg-[#111] border border-[#2A2A2A] rounded-md px-3 py-3 text-sm text-[#F5F5F5] placeholder-[#888] focus:outline-none focus:border-[#8a7248] transition-colors";

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
      <div className="w-full max-w-xs">
        <h1 className="font-serif text-3xl text-center mb-1 text-[#F5F5F5]">
          NOIR <span className="text-[#C8A96B]">·</span> ADMIN
        </h1>
        <p className="text-xs text-center text-[#888] mb-8 tracking-wider">Panel de administración</p>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Email</label>
            <input className={inputClass} type="email" placeholder="admin@tulocal.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1.5 block">Contraseña</label>
            <input className={inputClass} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          </div>
        </div>

        {error && <p className="text-xs text-red-400 mt-3 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-5 bg-[#C8A96B] text-[#0D0D0D] py-3 rounded text-sm font-medium tracking-wide hover:bg-[#C8A96B]/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </div>
  );
}

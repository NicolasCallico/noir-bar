"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
  const [status, setStatus] = useState("Cargando...");
  const [envVars, setEnvVars] = useState({});

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    try {
      // Verificar variables de entorno
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      setEnvVars({
        url: supabaseUrl ? "✅ Configurada" : "❌ Faltante",
        key: supabaseKey ? "✅ Configurada" : "❌ Faltante",
        urlValue: supabaseUrl,
        keyValue: supabaseKey?.substring(0, 20) + "..."
      });

      if (!supabaseUrl || !supabaseKey) {
        setStatus("❌ Variables de entorno faltantes");
        return;
      }

      // Intentar conectar a Supabase
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from("venue_settings")
        .select("count")
        .limit(1);

      if (error) {
        setStatus(`❌ Error de conexión: ${error.message}`);
      } else {
        setStatus("✅ Conexión exitosa a Supabase");
      }

    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h1>🔍 Debug Supabase</h1>

      <div style={{ marginBottom: 20 }}>
        <h2>Estado de conexión:</h2>
        <p style={{ fontSize: 18, fontWeight: "bold" }}>{status}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Variables de entorno:</h2>
        <p><strong>URL:</strong> {envVars.url}</p>
        <p><strong>KEY:</strong> {envVars.key}</p>
        <details>
          <summary>Ver valores completos</summary>
          <p><strong>URL:</strong> {envVars.urlValue}</p>
          <p><strong>KEY:</strong> {envVars.keyValue}</p>
        </details>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Próximos pasos:</h2>
        <ol>
          <li>Si las variables están ❌ faltantes → Configurar en Vercel</li>
          <li>Si hay error de conexión → Verificar credenciales en Supabase</li>
          <li>Si funciona → Ir a <a href="/seed">/seed</a> para crear datos</li>
        </ol>
      </div>

      <button
        onClick={checkConnection}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer"
        }}
      >
        🔄 Re-verificar
      </button>
    </div>
  );
}

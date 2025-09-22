import { useEffect, useState } from "react";

export function useBackendStatus(url: string) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Conectando con el backend...");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;

    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // timeout de 5s

        const res = await fetch(`${url}/ping`, { signal: controller.signal });
        clearTimeout(timeout);

        if (res.ok) {
          setLoading(false);
          setMessage("Backend listo ✅");
          if (interval) clearInterval(interval);
        } else {
          setMessage("Render todavía se está iniciando...");
        }
      } catch {
        setMessage("Render se está iniciando, espera unos segundos...");
      }
    };

    // Intentar cada 3s hasta que Render esté arriba
    checkBackend();
    interval = setInterval(checkBackend, 3000);

    return () => clearInterval(interval);
  }, [url]);

  return { loading, message };
}

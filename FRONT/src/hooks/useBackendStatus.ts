import { useEffect, useState } from "react";

export function useBackendStatus(url: string) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await fetch(`${url}/ping`);
      } catch (err) {
        console.error("Backend aún no responde...", err);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, [url]);

  return loading;
}

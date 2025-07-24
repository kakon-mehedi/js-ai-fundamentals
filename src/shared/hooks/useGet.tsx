import { useEffect, useRef, useState } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface GetResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: ApiStatus;
  refetch: () => void;
}

const cache = new Map<string, any>();

export function useGet<T>(url: string, deps: any[] = [], cacheEnabled = true): GetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    setStatus('loading');
    setError(null);
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      if (cacheEnabled && cache.has(url)) {
        setData(cache.get(url));
        setStatus('success');
        return;
      }

      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result: T = await response.json();
      setData(result);
      if (cacheEnabled) cache.set(url, result);
      setStatus('success');
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong');
        setStatus('error');
      }
    }
  };

  useEffect(() => {
    fetchData();
    return () => abortControllerRef.current?.abort();
  }, [url, ...deps]);

  const refetch = () => {
    cache.delete(url);
    fetchData();
  };

  return { data, error, loading: status === 'loading', status, refetch };
}

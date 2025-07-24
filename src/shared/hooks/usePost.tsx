import { useState } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface PostResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: ApiStatus;
  post: (body: any) => Promise<void>;
}

export function usePost<T>(url: string): PostResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');

  const post = async (body: any) => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(`POST error: ${response.status}`);

      const result: T = await response.json();
      setData(result);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'POST failed');
      setStatus('error');
    }
  };

  return { data, error, loading: status === 'loading', status, post };
}

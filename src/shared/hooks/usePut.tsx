import { useState } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface PutResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: ApiStatus;
  put: (body: any) => Promise<void>;
}

export function usePut<T>(url: string): PutResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');

  const put = async (body: any) => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(`PUT error: ${response.status}`);

      const result: T = await response.json();
      setData(result);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'PUT failed');
      setStatus('error');
    }
  };

  return { data, error, loading: status === 'loading', status, put };
}

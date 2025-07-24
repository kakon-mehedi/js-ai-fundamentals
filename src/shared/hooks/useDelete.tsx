import { useState } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface DeleteResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: ApiStatus;
  remove: () => Promise<void>;
}

export function useDelete<T>(url: string): DeleteResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');

  const remove = async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`DELETE error: ${response.status}`);

      const result: T = await response.json();
      setData(result);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'DELETE failed');
      setStatus('error');
    }
  };

  return { data, error, loading: status === 'loading', status, remove };
}

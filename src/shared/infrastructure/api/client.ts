const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(
  path: string,
  options?: { empresaId?: string },
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.empresaId) {
    headers['X-Empresa-Id'] = options.empresaId;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      body.code ?? 'API_ERROR',
      body.detail ?? `HTTP ${res.status}`,
      res.status,
    );
  }

  return res.json() as Promise<T>;
}

export async function apiPost<TBody, TResponse>(
  path: string,
  body: TBody,
  options?: { empresaId?: string },
): Promise<TResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.empresaId) {
    headers['X-Empresa-Id'] = options.empresaId;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(
      err.code ?? 'API_ERROR',
      err.detail ?? `HTTP ${res.status}`,
      res.status,
    );
  }

  return res.json() as Promise<TResponse>;
}

export async function apiPut<TBody, TResponse>(
  path: string,
  body: TBody,
  options?: { empresaId?: string },
): Promise<TResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.empresaId) {
    headers['X-Empresa-Id'] = options.empresaId;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(
      err.code ?? 'API_ERROR',
      err.detail ?? `HTTP ${res.status}`,
      res.status,
    );
  }

  return res.json() as Promise<TResponse>;
}

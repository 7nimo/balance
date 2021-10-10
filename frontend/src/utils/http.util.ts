export interface HttpResponse<T> extends Response {
  data?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    // may error if there is no body
    response.data = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }
): Promise<HttpResponse<T>> {
  return http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body?: any,
  args: RequestInit = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> {
  return http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> {
  return http<T>(new Request(path, args));
}

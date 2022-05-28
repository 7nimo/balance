/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
export interface HttpResponse<T> extends Response {
  data?: T;
}

export async function http<T> (request: Request): Promise<T> {
  // eslint-disable-next-line no-console
  console.log('request: ', request.url);
  const response: HttpResponse<T> = await fetch(request);

  if (response.ok) {
    return await response.json();
  }

  return Promise.reject(response.statusText);
}

export async function get<T> (
  path: string,
  args: RequestInit = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }
): Promise<T> {
  return http<T>(new Request(path, args));
}

export async function post<T> (
  path: string,
  body?: any,
  args: RequestInit = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  }
): Promise<T> {
  return http<T>(new Request(path, args));
}

export async function postFile<T> (
  path: string,
  body: any,
  args: RequestInit = {
    method: 'post',
    credentials: 'include',
    body
  }
): Promise<T> {
  return http<T>(new Request(path, args));
}

export async function patch<T> (
  path: string,
  body: any,
  args: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  }
): Promise<T> {
  return http<T>(new Request(path, args));
}

export async function put<T> (
  path: string,
  body: any,
  args: RequestInit = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  }
): Promise<T> {
  return http<T>(new Request(path, args));
}

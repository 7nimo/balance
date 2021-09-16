interface HttpResponse<T> extends Response {
  data?: T;
}

export async function http<T>(
  request: RequestInfo,
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(
    request,
  );

  try {
    // may error if there is no body
    response.data = await response.json();
  // eslint-disable-next-line no-empty
  } catch (error) { }

  if (!response.ok) {
    throw new Error(response.statusText);
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
  },
): Promise<HttpResponse<T>> {
  return http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
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
    body: JSON.stringify(body),
  },
): Promise<HttpResponse<T>> {
  return http<T>(new Request(path, args));
}

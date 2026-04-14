type RequestLike = {
  headers?: Record<string, string | string[] | undefined>;
};

function getHeader(headers: RequestLike['headers'], name: string) {
  if (!headers) {
    return undefined;
  }

  const value = headers[name.toLowerCase()] ?? headers[name];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function getRequestMeta(req: RequestLike) {
  const headers = req.headers ?? {};
  const forwarded = getHeader(headers, 'x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0]?.trim() : undefined;
  const userAgent = getHeader(headers, 'user-agent');
  const referrer = getHeader(headers, 'referer') ?? getHeader(headers, 'referrer');

  return { ip, userAgent, referrer };
}

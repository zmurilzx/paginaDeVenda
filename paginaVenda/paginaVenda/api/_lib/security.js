export const isAllowedRequestOrigin = (request) => {
  const origin = request.headers.origin;
  if (!origin) return true;

  try {
    const { hostname } = new URL(origin);
    return (
      hostname === 'cinestreamoficial.site' ||
      hostname === 'www.cinestreamoficial.site' ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.vercel.app')
    );
  } catch {
    return false;
  }
};

const defaultOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

function getConfiguredOrigins(env = process.env) {
  return [...defaultOrigins, env.CLIENT_URL, env.CLIENT_URLS]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isLocalDevelopmentOrigin(origin) {
  try {
    const url = new URL(origin);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    if (url.hostname === 'localhost' || url.hostname === '[::1]') return true;

    const octets = url.hostname.split('.');
    return octets.length === 4
      && octets[0] === '127'
      && octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255);
  } catch {
    return false;
  }
}

function isAllowedOrigin(origin, env = process.env) {
  if (!origin) return true;
  if (getConfiguredOrigins(env).includes(origin)) return true;
  return env.NODE_ENV !== 'production' && isLocalDevelopmentOrigin(origin);
}

module.exports = { getConfiguredOrigins, isAllowedOrigin };

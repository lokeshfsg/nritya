const { isAllowedOrigin } = require('../config/cors');

describe('CORS origin policy', () => {
  test('allows configured frontend origins in production', () => {
    expect(isAllowedOrigin('https://studio.example', {
      NODE_ENV: 'production',
      CLIENT_URLS: 'https://studio.example, https://admin.example'
    })).toBe(true);
  });

  test('rejects unconfigured origins in production', () => {
    expect(isAllowedOrigin('http://localhost:3001', {
      NODE_ENV: 'production'
    })).toBe(false);
  });
});

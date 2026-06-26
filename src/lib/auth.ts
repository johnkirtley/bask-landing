export function getDiscordAuthorizationUrl(): string {
  const clientId = import.meta.env.PUBLIC_DISCORD_CLIENT_ID;
  const redirectUri = `${import.meta.env.PUBLIC_APP_URL}/api/auth/discord`;
  const scope = 'identify';
  
  return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
}

export async function exchangeDiscordCode(code: string) {
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: import.meta.env.PUBLIC_DISCORD_CLIENT_ID,
      client_secret: import.meta.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${import.meta.env.PUBLIC_APP_URL}/api/auth/discord`,
    }),
  });

  if (!response.ok) throw new Error('Failed to exchange code');
  return response.json();
}

export async function getDiscordUser(accessToken: string) {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}
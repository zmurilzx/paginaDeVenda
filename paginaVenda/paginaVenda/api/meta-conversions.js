import crypto from 'node:crypto';

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const hashSha256 = (value) => {
  if (!value || typeof value !== 'string') return undefined;
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
};

const buildUserData = ({ base = {}, email, phone, clientIp, userAgent }) => {
  const hashedEmail = hashSha256(email);
  const hashedPhone = hashSha256(phone);

  const merged = {
    ...base,
    client_ip_address: base.client_ip_address || clientIp,
    client_user_agent: base.client_user_agent || userAgent,
  };

  if (Array.isArray(base.em)) {
    merged.em = base.em;
  } else if (hashedEmail) {
    merged.em = [hashedEmail];
  }

  if (Array.isArray(base.ph)) {
    merged.ph = base.ph;
  } else if (hashedPhone) {
    merged.ph = [hashedPhone];
  }

  return Object.fromEntries(
    Object.entries(merged)
      .map(([key, value]) => [key, Array.isArray(value) ? value.filter(Boolean) : value])
      .filter(([, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null;
      })
  );
};

const normalizeEvents = (body, clientIp, userAgent) => {
  if (Array.isArray(body?.data)) {
    return body.data.map((event) => ({
      action_source: 'website',
      event_time: event.event_time || Math.floor(Date.now() / 1000),
      ...event,
      user_data: buildUserData({
        base: event.user_data || {},
        clientIp,
        userAgent,
      }),
    }));
  }

  return [
    {
      event_name: body?.event_name || 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: body?.event_id,
      action_source: 'website',
      event_source_url: body?.event_source_url,
      user_data: buildUserData({
        email: body?.email,
        phone: body?.phone,
        clientIp,
        userAgent,
      }),
      custom_data: body?.custom_data,
    },
  ];
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing Meta Pixel configuration' });
  }

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'];
  const userAgent = req.headers['user-agent'];

  const events = normalizeEvents(req.body, clientIp, userAgent);

  const payload = {
    data: events,
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  const url = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(json);
  }

  return res.status(200).json(json);
}

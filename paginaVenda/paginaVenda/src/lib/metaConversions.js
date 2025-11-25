export const META_CONVERSION_CONFIG = {
  pixelId: import.meta.env.VITE_META_PIXEL_ID,
  accessToken: import.meta.env.VITE_META_ACCESS_TOKEN,
};

const META_CONVERSION_ENDPOINT = (pixelId) =>
  `https://graph.facebook.com/v19.0/${pixelId}/events`;

const purchaseEventPayload = {
  data: [
    {
      event_name: "Purchase",
      event_time: 1764099073,
      action_source: "website",
      user_data: {
        em: [
          "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068",
        ],
        ph: [null],
      },
      attribution_data: {
        attribution_share: "0.3",
      },
      custom_data: {
        currency: "USD",
        value: "142.52",
      },
      original_event_data: {
        event_name: "Purchase",
        event_time: 1764099073,
      },
    },
  ],
};

export const sendMetaPurchaseEvent = async () => {
  const { pixelId, accessToken } = META_CONVERSION_CONFIG;

  if (!pixelId || !accessToken) {
    console.warn(
      "Meta Conversions API configuration is missing. Set VITE_META_PIXEL_ID and VITE_META_ACCESS_TOKEN."
    );
    return;
  }

  try {
    const response = await fetch(
      `${META_CONVERSION_ENDPOINT(pixelId)}?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseEventPayload),
      }
    );

    if (!response.ok) {
      console.error("Failed to send Meta conversion event", response.statusText);
    }
  } catch (error) {
    console.error("Error sending Meta conversion event", error);
  }
};

const ENDPOINT = "/api/contact.php";

export type ContactEmailPayload = {
  subject: string;
  body: string;
  replyTo?: string;
  /** Honeypot — must always be an empty string from real users. */
  website?: string;
};

/**
 * Posts form details to the PHP endpoint (public/api/contact.php) which
 * emails them to the business inbox on cPanel.
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ website: "", ...payload }),
    });
  } catch {
    throw new Error("Network error while sending your message");
  }

  if (!res.ok) {
    let detail = "";
    try {
      const data = (await res.json()) as { error?: string };
      detail = data.error ? `: ${data.error}` : "";
    } catch {
      // ignore non-JSON error bodies
    }
    if (res.status === 429) {
      throw new Error("Too many submissions, please try again in a few minutes");
    }
    throw new Error(`Could not send your message${detail}`);
  }
}

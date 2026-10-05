import site from "@/content/site.json";

const WHATSAPP_NUMBER = site.phoneHref.replace("+", "");

export function sendToWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

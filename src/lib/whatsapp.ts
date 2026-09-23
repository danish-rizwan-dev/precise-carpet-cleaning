const WHATSAPP_NUMBER = "61434161161"; // 0434 161 161

export function sendToWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

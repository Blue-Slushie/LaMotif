export const WHATSAPP_PHONE = (import.meta.env.VITE_WHATSAPP_PHONE || '').replace(/[^\d]/g, '');
export const WHATSAPP_GREETING = import.meta.env.VITE_WHATSAPP_GREETING || 'Hello! I\'d like to inquire about:';

export function openWhatsAppMessage(message) {
  if (!WHATSAPP_PHONE) {
    alert('WhatsApp phone number is not configured.');
    return;
  }
  const encoded = encodeURIComponent(message);
  const primary = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
  const fallback = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;

  const win = window.open(primary, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = primary;
  setTimeout(() => {
    if (!document.hidden) window.open(fallback, '_blank', 'noopener,noreferrer');
  }, 1200);
}
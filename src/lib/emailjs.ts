import emailjs from "@emailjs/browser";
import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";

export type VisitConfirmationParams = {
  to_email: string;
  first_name: string;
  last_name: string;
  project_name: string | null;
  visit_date: string; // formatted for display, e.g. "18 de fevereiro de 2026"
  visit_time: string; // "10:00" or "15:00"
  booking_id: string;
  phone_primary: string;
  phone_alt?: string | null;
  document_type: string;
  document_number: string;
};

function getEmailJSConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
  return { serviceId, templateId, publicKey };
}

/**
 * Envia e-mail de confirmação de agendamento via EmailJS.
 * Se as variáveis de ambiente do EmailJS não estiverem definidas, não envia e retorna { sent: false }.
 */
export async function sendVisitConfirmationEmail(params: VisitConfirmationParams): Promise<{ sent: boolean; error?: string }> {
  const { serviceId, templateId, publicKey } = getEmailJSConfig();
  if (!serviceId || !templateId || !publicKey) {
    return { sent: false };
  }

  const toEmail = params.to_email?.trim();
  if (!toEmail) {
    return { sent: false, error: "O endereço do destinatário está vazio." };
  }

  const templateParams = {
    to_email: toEmail,
    first_name: params.first_name,
    last_name: params.last_name,
    full_name: `${params.first_name} ${params.last_name}`,
    project_name: params.project_name ?? "Não indicado",
    visit_date: params.visit_date,
    visit_time: params.visit_time === "10:00" ? "10h00" : "15h00",
    booking_id: params.booking_id,
    phone_primary: params.phone_primary,
    phone_alt: params.phone_alt ?? "-",
    document_type: params.document_type,
    document_number: params.document_number,
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao enviar e-mail";
    return { sent: false, error: message };
  }
}

/**
 * Formata uma data para exibição no e-mail (ex: "18 de fevereiro de 2026").
 */
export function formatVisitDateForEmail(date: Date): string {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: pt });
}

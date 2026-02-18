import { supabase } from "@/lib/supabaseClient";

export type DocumentType = "BI" | "PASSAPORTE";

export type CreateVisitBookingInput = {
  project_name?: string | null;
  first_name: string;
  last_name: string;
  document_type: DocumentType;
  document_number: string;
  phone_primary: string;
  phone_alt?: string | null;
  email: string;
  slot_at_iso: string; // ex: 2026-02-18T10:00:00 (local)
};

export type CreateVisitBookingResult =
  | { ok: true; booking_id: string }
  | { ok: false; reason: "slot_full" | "invalid_slot" | "supabase_not_configured" | "unknown"; message: string };

function isLikelyEnvMisconfigError(message: string): boolean {
  return message.includes("Missing environment variable VITE_SUPABASE_");
}

export async function createVisitBooking(input: CreateVisitBookingInput): Promise<CreateVisitBookingResult> {
  try {
    const { data, error } = await supabase.rpc("create_visit_booking", {
      p_project_name: input.project_name ?? null,
      p_first_name: input.first_name,
      p_last_name: input.last_name,
      p_document_type: input.document_type,
      p_document_number: input.document_number,
      p_phone_primary: input.phone_primary,
      p_phone_alt: input.phone_alt ?? null,
      p_email: input.email,
      p_slot_at: input.slot_at_iso,
    });

    if (error) {
      const msg = error.message ?? "Erro ao agendar visita.";
      if (msg.toLowerCase().includes("slot_full")) {
        return { ok: false, reason: "slot_full", message: "Este horário já atingiu o limite de 10 agendamentos." };
      }
      if (msg.toLowerCase().includes("invalid_slot")) {
        return { ok: false, reason: "invalid_slot", message: "Data/horário inválidos. Escolha Quarta/Sexta às 10h ou 15h." };
      }
      return { ok: false, reason: "unknown", message: msg };
    }

    // Function returns UUID
    if (typeof data === "string" && data.length > 0) {
      return { ok: true, booking_id: data };
    }

    return { ok: false, reason: "unknown", message: "Resposta inesperada do servidor." };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro inesperado.";
    if (isLikelyEnvMisconfigError(msg)) {
      return {
        ok: false,
        reason: "supabase_not_configured",
        message:
          "Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no seu .env e reinicie o servidor.",
      };
    }
    return { ok: false, reason: "unknown", message: msg };
  }
}


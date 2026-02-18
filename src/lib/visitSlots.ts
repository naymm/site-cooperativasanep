import { addDays, format, isAfter, isSameDay, startOfDay } from "date-fns";

export type VisitTime = "10:00" | "15:00";

export const VISIT_TIMES: VisitTime[] = ["10:00", "15:00"];

export function isAllowedVisitDate(d: Date): boolean {
  // JS: 0=Sun ... 3=Wed ... 5=Fri
  const day = d.getDay();
  return day === 3 || day === 5;
}

export function isPastDay(d: Date): boolean {
  return isAfter(startOfDay(new Date()), startOfDay(d));
}

export function nextAllowedVisitDays(from = new Date(), count = 12): Date[] {
  const result: Date[] = [];
  let cursor = startOfDay(from);

  // include today if valid (and not in the past by start-of-day)
  for (let i = 0; result.length < count && i < 366; i++) {
    const day = i === 0 ? cursor : addDays(cursor, i);
    if (isAllowedVisitDate(day) && !isPastDay(day)) result.push(day);
  }
  return result;
}

export function formatDateLabel(d: Date): string {
  return format(d, "dd/MM/yyyy");
}

export function sameDay(a: Date | undefined, b: Date | undefined): boolean {
  if (!a || !b) return false;
  return isSameDay(a, b);
}

export function slotAtISO(date: Date, time: VisitTime): string {
  // Use local time; Supabase will store as timestamptz.
  const yyyy = format(date, "yyyy");
  const mm = format(date, "MM");
  const dd = format(date, "dd");
  return `${yyyy}-${mm}-${dd}T${time}:00`;
}


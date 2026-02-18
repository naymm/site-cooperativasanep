import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { sendVisitConfirmationEmail, formatVisitDateForEmail } from "@/lib/emailjs";
import { createVisitBooking, type DocumentType } from "@/lib/visitBooking";
import { VISIT_TIMES, formatDateLabel, isAllowedVisitDate, isPastDay, slotAtISO, type VisitTime } from "@/lib/visitSlots";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const PROJECT_NONE_VALUE = "__none__";
const PROJECT_OPTIONS = [
  { value: PROJECT_NONE_VALUE, label: "Nenhum" },
  { value: "Urbanização KK5800", label: "Urbanização KK5800" },
];

const schema = z.object({
  project_name: z.string().max(120).optional(),
  first_name: z.string().trim().min(2, "Primeiro nome é obrigatório.").max(80),
  last_name: z.string().trim().min(2, "Último nome é obrigatório.").max(80),
  document_type: z.enum(["BI", "PASSAPORTE"]),
  document_number: z.string().trim().min(4, "Número do documento é obrigatório.").max(40),
  phone_primary: z.string().trim().min(6, "Telefone principal é obrigatório.").max(30),
  phone_alt: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Email inválido.").max(120),
  visit_date: z.date({ required_error: "Escolha a data da visita." }),
  visit_time: z.enum(["10:00", "15:00"]),
});

type FormValues = z.infer<typeof schema>;

export default function AgendarVisita() {
  const [searchParams] = useSearchParams();
  const projectFromUrl = searchParams.get("project") ?? "";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      project_name: PROJECT_OPTIONS.some((o) => o.value === projectFromUrl) ? projectFromUrl : PROJECT_NONE_VALUE,
      first_name: "",
      last_name: "",
      document_type: "BI",
      document_number: "",
      phone_primary: "",
      phone_alt: "",
      email: "",
      visit_time: "10:00",
    },
  });

  const visitDate = form.watch("visit_date");
  const disabledDay = (d: Date) => isPastDay(d) || !isAllowedVisitDate(d);

  const timeOptions = useMemo(() => {
    if (!visitDate) return VISIT_TIMES;
    if (!isAllowedVisitDate(visitDate) || isPastDay(visitDate)) return [];
    return VISIT_TIMES;
  }, [visitDate]);

  async function onSubmit(values: FormValues) {
    if (!isAllowedVisitDate(values.visit_date) || isPastDay(values.visit_date)) {
      toast({
        title: "Data inválida",
        description: "As visitas são apenas às Quartas e Sextas (10h e 15h).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createVisitBooking({
        project_name: values.project_name && values.project_name !== PROJECT_NONE_VALUE ? values.project_name.trim() : null,
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        document_type: values.document_type as DocumentType,
        document_number: values.document_number.trim(),
        phone_primary: values.phone_primary.trim(),
        phone_alt: values.phone_alt?.trim() ? values.phone_alt.trim() : null,
        email: values.email.trim(),
        slot_at_iso: slotAtISO(values.visit_date, values.visit_time as VisitTime),
      });

      if (!result.ok) {
        toast({
          title: "Não foi possível agendar",
          description: result.message,
          variant: "destructive",
        });
        return;
      }

      const emailResult = await sendVisitConfirmationEmail({
        to_email: values.email.trim(),
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        project_name: values.project_name && values.project_name !== PROJECT_NONE_VALUE ? values.project_name.trim() : null,
        visit_date: formatVisitDateForEmail(values.visit_date),
        visit_time: values.visit_time,
        booking_id: result.booking_id,
        phone_primary: values.phone_primary.trim(),
        phone_alt: values.phone_alt?.trim() ? values.phone_alt.trim() : null,
        document_type: values.document_type,
        document_number: values.document_number.trim(),
      });

      toast({
        title: "Agendamento confirmado",
        description: emailResult.sent
          ? "Reserva criada com sucesso. Enviámos um e-mail de confirmação para o seu correio."
          : `Reserva criada com sucesso. Código: ${result.booking_id}`,
      });
      form.reset({ ...form.getValues(), first_name: "", last_name: "", document_number: "", phone_primary: "", phone_alt: "", email: "" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Agendar visita</h1>
              <p className="text-muted-foreground mt-2">
                As visitas acontecem apenas às <span className="font-medium">Quartas-Feiras</span> e{" "}
                <span className="font-medium">Sextas-Feiras</span>, nos horários <span className="font-medium">10h</span> e{" "}
                <span className="font-medium">15h</span>. Limite: <span className="font-medium">10 agendamentos</span> por horário.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dados do visitante</CardTitle>
                <CardDescription>Preencha os dados para confirmar o seu agendamento.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="project_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Projecto (opcional)</FormLabel>
                          <Select value={field.value ?? PROJECT_NONE_VALUE} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Escolha o projecto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PROJECT_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">

                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primeiro nome</FormLabel>
                            <FormControl>
                              <Input autoComplete="given-name" placeholder="Ex: Ana" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Último nome</FormLabel>
                            <FormControl>
                              <Input autoComplete="family-name" placeholder="Ex: Santos" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="document_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Documento</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Escolha" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="BI">BI</SelectItem>
                                <SelectItem value="PASSAPORTE">Passaporte</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="document_number"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>Nº do documento</FormLabel>
                            <FormControl>
                              <Input placeholder="BI / Passaporte" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone_primary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone (principal)</FormLabel>
                            <FormControl>
                              <Input inputMode="tel" placeholder="+244 ..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone_alt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone (alternativo)</FormLabel>
                            <FormControl>
                              <Input inputMode="tel" placeholder="+244 ..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" autoComplete="email" placeholder="ex: nome@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="visit_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Data</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? formatDateLabel(field.value) : <span>Escolha uma data</span>}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={disabledDay}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="visit_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(v) => field.onChange(v)}
                              disabled={timeOptions.length === 0}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Escolha" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {VISIT_TIMES.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t === "10:00" ? "10h" : "15h"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          A agendar...
                        </>
                      ) : (
                        "Confirmar agendamento"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}


# E-mail de confirmação de agendamento (EmailJS)

O envio do e-mail de confirmação é feito através do [EmailJS](https://www.emailjs.com/). Se as variáveis de ambiente não estiverem definidas, o agendamento continua a ser guardado no Supabase e o utilizador vê uma mensagem de sucesso sem referência ao e-mail.

## Variáveis de ambiente

Adicione ao ficheiro `.env` na raiz do projecto:

```env
VITE_EMAILJS_SERVICE_ID=o_teu_service_id
VITE_EMAILJS_TEMPLATE_ID=o_teu_template_id
VITE_EMAILJS_PUBLIC_KEY=a_tua_public_key
```

Obtenha estes valores no [dashboard do EmailJS](https://dashboard.emailjs.com/): Service → ID do serviço; Template → ID do template; Account → Public Key.

## Template no EmailJS

No template de e-mail, use as variáveis com a sintaxe `{{nome_da_variavel}}`. Variáveis disponíveis:

| Variável        | Exemplo                          | Descrição                          |
|-----------------|----------------------------------|------------------------------------|
| `to_email`      | `visitante@email.com`            | E-mail do destinatário              |
| `first_name`    | `Ana`                            | Primeiro nome                       |
| `last_name`     | `Santos`                         | Último nome                         |
| `full_name`     | `Ana Santos`                      | Nome completo                       |
| `project_name`  | `Urbanização KK5800` ou `Não indicado` | Projecto escolhido (ou texto padrão) |
| `visit_date`    | `18 de fevereiro de 2026`        | Data da visita (formato PT)         |
| `visit_time`    | `10h00` ou `15h00`               | Hora da visita                      |
| `booking_id`    | `uuid-do-supabase`              | Identificador da reserva            |
| `phone_primary` | `+244 923 456 789`               | Telefone principal                  |
| `phone_alt`     | `+244 ...` ou `-`                | Telefone alternativo                |
| `document_type` | `BI` ou `PASSAPORTE`             | Tipo de documento                   |
| `document_number` | `12345678LA123`               | Número do documento                 |

### Exemplo de corpo de template

```
Olá {{first_name}} {{last_name}},

Confirmamos o seu agendamento de visita.

Resumo:
- Projecto: {{project_name}}
- Data: {{visit_date}} às {{visit_time}}
- Código da reserva: {{booking_id}}

Contactos registados: {{phone_primary}} (alt: {{phone_alt}}).

Obrigado,
Cooperativa Sanep
```

### Destinatário (obrigatório no template)

Para evitar o erro **"The recipients address is empty"**:

1. No dashboard do EmailJS, abra o seu **template** (Email Templates).
2. No campo **"To"** / **"Recipient"** / **"To Email"**, coloque exatamente: **`{{to_email}}`** (com as chavetas).
3. Não deixe o campo "To" em branco nem use um e-mail fixo; o nosso código envia o e-mail do visitante em `to_email`, e o EmailJS substitui `{{to_email}}` por esse valor.

Se o campo "To" não tiver `{{to_email}}`, o destinatário fica vazio e a API devolve erro.

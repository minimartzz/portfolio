"use server";

import nodemailer from "nodemailer";

export type ContactFormState = {
  success: boolean;
  error?: string;
} | null;

export type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function validateFields(fields: ContactFormFields): string | null {
  if (!fields.firstName.trim()) return "First name is required.";
  if (!fields.lastName.trim()) return "Last name is required.";
  if (!fields.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    return "Please enter a valid email address.";
  if (!fields.message.trim()) return "Message is required.";
  if (fields.message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
}

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fields: ContactFormFields = {
    firstName: (formData.get("firstName") as string) ?? "",
    lastName: (formData.get("lastName") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
  };

  const validationError = validateFields(fields);
  if (validationError) return { success: false, error: validationError };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    return { success: false, error: "Email service is not configured." };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    replyTo: `${fields.firstName} ${fields.lastName} <${fields.email}>`,
    to: CONTACT_EMAIL,
    subject: `Portfolio message from ${fields.firstName} ${fields.lastName}`,
    text: fields.message,
    html: `
      <p><strong>From:</strong> ${fields.firstName} ${fields.lastName} (${fields.email})</p>
      <hr />
      <pre style="font-family:inherit;white-space:pre-wrap">${fields.message}</pre>
    `,
  });

  return { success: true };
}

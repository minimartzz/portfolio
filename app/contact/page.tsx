"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail } from "@/app/actions/contact";
import type { ContactFormState } from "@/app/actions/contact";

const ContactPage = () => {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(sendContactEmail, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Send me a message and I&apos;ll get back to you via email.
      </p>

      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium">
              First name <span className="text-destructive">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First Name"
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last name <span className="text-destructive">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last Name"
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium">
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Write your message here…"
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-y font-mono"
          />
        </div>

        {/* Feedback */}
        {state?.error && (
          <p role="alert" className="text-sm text-destructive font-medium">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p
            role="status"
            className="text-sm text-green-600 dark:text-green-400 font-medium"
          >
            Message sent! I&apos;ll be in touch soon.
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="self-end px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;

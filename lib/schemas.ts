import { z } from "zod";

/** Shared request shapes. Safe to import from client code — no secrets here. */

export const subjectIdSchema = z.enum(["biology", "chemistry", "physics", "maths"]);
export const levelIdSchema = z.enum(["gcse", "a-level"]);

export const answerSchema = z.object({
  questionId: z.string().min(1).max(64),
  selectedIndex: z.number().int().min(0).max(9).nullable(),
});

export const submitAssessmentSchema = z.object({
  subject: subjectIdSchema,
  level: levelIdSchema,
  answers: z.array(answerSchema).max(100),
});

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Enter an email address")
  .max(254, "That email address is too long")
  .email("Enter a valid email address");

export const reportRequestSchema = submitAssessmentSchema.extend({
  email: emailSchema,
  /** Optional first name, purely so the email can be addressed properly. */
  name: z.string().trim().max(80).optional(),
  /** Explicit opt-in for anything beyond this one report. */
  marketingConsent: z.boolean().optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: emailSchema,
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Please tell us a little more").max(4000),
  marketingConsent: z.boolean().optional(),
  turnstileToken: z.string().max(4096).optional(),
  /**
   * Honeypot — real people never fill this in. Deliberately NOT rejected here:
   * validating it would return a 400 that tells a bot exactly which field is the
   * trap. The route accepts the submission and quietly discards it instead.
   */
  website: z.string().max(200).optional(),
});

export type SubmitAssessmentInput = z.infer<typeof submitAssessmentSchema>;
export type ReportRequestInput = z.infer<typeof reportRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

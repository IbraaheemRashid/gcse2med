import "server-only";

import type { AssessmentResult } from "./marking";
import { subjectById, levelById } from "@/content/subjects";
import { site } from "@/content/site";

const BRAND = "#2456eb";
const INK = "#1e293b";
const MUTED = "#64748b";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
    <tr><td style="padding:20px 28px;background:${BRAND};color:#ffffff;font-weight:700;font-size:18px;letter-spacing:-0.02em;">${escapeHtml(site.name)}</td></tr>
    <tr><td style="padding:28px;">${body}</td></tr>
    <tr><td style="padding:18px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;color:${MUTED};font-size:12px;line-height:1.6;">
      ${escapeHtml(site.name)} &middot; <a href="${site.url}" style="color:${BRAND};">${escapeHtml(site.url.replace(/^https?:\/\//, ""))}</a><br>
      You are receiving this because this address was entered on our website. Reply to this email if that was not you and we will delete it.
    </td></tr>
  </table>
</body></html>`;
}

export function assessmentReportEmail(result: AssessmentResult): {
  subject: string;
  html: string;
  text: string;
} {
  const subjectName = subjectById[result.subject].name;
  const levelName = levelById[result.level].name;
  const heading = `${levelName} ${subjectName} assessment results`;

  const wrong = result.questions.filter((question) => !question.correct);

  const topicRows = result.topics
    .map(
      (topic) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(topic.topic)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;text-align:right;font-variant-numeric:tabular-nums;color:${
          topic.correct === topic.total ? "#15803d" : "#b91c1c"
        };font-weight:600;">${topic.correct} / ${topic.total}</td>
      </tr>`,
    )
    .join("");

  const wrongBlocks = wrong
    .map(
      (question) => `<div style="margin:0 0 18px;padding:16px;border:1px solid #e2e8f0;border-radius:10px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:${MUTED};margin-bottom:6px;">${escapeHtml(question.topic)}</div>
      <div style="font-weight:600;margin-bottom:10px;">${escapeHtml(question.stem)}</div>
      <div style="font-size:14px;color:#b91c1c;margin-bottom:4px;">Your answer: ${
        question.selectedIndex === null
          ? "not answered"
          : escapeHtml(question.options[question.selectedIndex])
      }</div>
      <div style="font-size:14px;color:#15803d;margin-bottom:10px;">Correct answer: ${escapeHtml(question.options[question.correctIndex])}</div>
      <div style="font-size:14px;line-height:1.6;color:${MUTED};">${escapeHtml(question.explanation)}</div>
    </div>`,
    )
    .join("");

  const focus =
    result.focusTopics.length > 0
      ? `<p style="margin:0 0 8px;font-weight:600;">Areas to work on</p>
         <ul style="margin:0 0 24px;padding-left:20px;line-height:1.7;">${result.focusTopics
           .map((topic) => `<li>${escapeHtml(topic)}</li>`)
           .join("")}</ul>`
      : `<p style="margin:0 0 24px;line-height:1.7;">Full marks on every topic in this assessment — the next step is applying it under timed exam conditions.</p>`;

  const body = `
    <h1 style="margin:0 0 6px;font-size:22px;letter-spacing:-0.02em;">${escapeHtml(heading)}</h1>
    <p style="margin:0 0 20px;color:${MUTED};font-size:14px;">Here is the full report, as promised. Nothing else is required from you.</p>

    <div style="padding:18px;border-radius:12px;background:#eff5ff;margin:0 0 24px;">
      <div style="font-size:32px;font-weight:700;color:${BRAND};letter-spacing:-0.03em;">${result.score} / ${result.total}<span style="font-size:16px;color:${MUTED};font-weight:600;"> &nbsp;(${result.percentage}%)</span></div>
      <div style="margin-top:6px;font-weight:600;">${escapeHtml(result.band)}</div>
      <div style="margin-top:4px;font-size:14px;line-height:1.6;color:${MUTED};">${escapeHtml(result.bandDetail)}</div>
    </div>

    ${focus}

    <p style="margin:0 0 8px;font-weight:600;">Topic breakdown</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;font-size:14px;">${topicRows}</table>

    ${
      wrong.length > 0
        ? `<p style="margin:0 0 12px;font-weight:600;">Questions to review (${wrong.length})</p>${wrongBlocks}`
        : ""
    }

    <div style="margin:28px 0 0;padding-top:20px;border-top:1px solid #e2e8f0;">
      <p style="margin:0 0 14px;line-height:1.7;">Want to talk through what this means and what to do next? A free consultation is a 30-minute video call with the founders, student and parent to understand what is going wrong and whether GCSE2MED can help.</p>
      <a href="${site.url}/book" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:8px;">Book a free consultation</a>
    </div>`;

  const text = [
    heading,
    "",
    `Score: ${result.score}/${result.total} (${result.percentage}%) — ${result.band}`,
    result.bandDetail,
    "",
    result.focusTopics.length > 0
      ? `Areas to work on: ${result.focusTopics.join(", ")}`
      : "Full marks on every topic in this assessment.",
    "",
    ...wrong.flatMap((question) => [
      `[${question.topic}] ${question.stem}`,
      `  Your answer: ${question.selectedIndex === null ? "not answered" : question.options[question.selectedIndex]}`,
      `  Correct answer: ${question.options[question.correctIndex]}`,
      `  ${question.explanation}`,
      "",
    ]),
    `Book a free consultation: ${site.url}/book`,
  ].join("\n");

  return {
    subject: `${subjectName} ${levelName} assessment: ${result.score}/${result.total}`,
    html: shell(heading, body),
    text,
  };
}

export function internalNotificationEmail(
  heading: string,
  fields: Record<string, string>,
): { subject: string; html: string; text: string } {
  const rows = Object.entries(fields)
    .map(
      ([label, value]) => `<tr>
        <td style="padding:8px 12px 8px 0;color:${MUTED};font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;font-size:14px;">${escapeHtml(value || "—").replace(/\n/g, "<br>")}</td>
      </tr>`,
    )
    .join("");

  return {
    subject: heading,
    html: shell(
      heading,
      `<h1 style="margin:0 0 16px;font-size:20px;">${escapeHtml(heading)}</h1>
       <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>`,
    ),
    text: `${heading}\n\n${Object.entries(fields)
      .map(([label, value]) => `${label}: ${value || "—"}`)
      .join("\n")}`,
  };
}

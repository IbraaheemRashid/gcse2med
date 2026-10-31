// The supplied exam date starts at midnight in the UK (BST).
export const examDate = Date.parse("2027-05-10T00:00:00+01:00");

function monthsBeforeExam(months: number) {
  const date = new Date(examDate);
  date.setUTCMonth(date.getUTCMonth() - months);
  return date.getTime();
}

export function examCountdown(now: number) {
  if (now >= examDate) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  let months = 0;
  while (monthsBeforeExam(months + 1) >= now) months++;
  let seconds = Math.max(0, Math.floor((monthsBeforeExam(months) - now) / 1000));
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  return { months, days, hours, minutes, seconds: seconds % 60 };
}

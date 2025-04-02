import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function calculateDuration(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const diff = dayjs.duration(end.diff(start));

  if (diff.asDays() >= 1) {
    return `${diff.days()}D ${diff.hours()}H ${diff.minutes()}M`;
  } else if (diff.asHours() >= 1) {
    return `${diff.hours()}H ${diff.minutes()}M`;
  } else {
    return `${diff.minutes()}M`;
  }
}

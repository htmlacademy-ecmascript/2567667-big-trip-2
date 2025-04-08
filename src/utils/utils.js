import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function calculateDuration(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const diffInMs = end.diff(start);
  const durationObj = dayjs.duration(diffInMs);

  const totalMinutes = durationObj.asMinutes();
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  const format = (value) => String(value).padStart(2, '0');

  if (days > 0) {
    return `${format(days)}D ${format(hours)}H ${format(minutes)}M`;
  } else if (hours > 0) {
    return `${format(hours)}H ${format(minutes)}M`;
  } else {
    return `${format(minutes)}M`;
  }
}

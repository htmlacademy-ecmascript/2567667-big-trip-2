import { SortType } from '../const.js';
import dayjs from 'dayjs';

export const sortFunctions = {
  [SortType.DAY]: (points) => points.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
  [SortType.TIME]: (points) => points.sort((a, b) => {
    const durationA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
    const durationB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
    return durationB - durationA;
  }),
  [SortType.PRICE]: (points) => points.sort((a, b) => b.basePrice - a.basePrice),
};

import { SortType } from '../const.js';
import dayjs from 'dayjs';

export const sortFunctions = {
  [SortType.DAY]: (points) => points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom)),
  [SortType.TIME]: (points) => points.sort((a, b) => (dayjs(a.dateTo) - dayjs(a.dateFrom)) - (dayjs(b.dateTo) - dayjs(b.dateFrom))),
  [SortType.PRICE]: (points) => points.sort((a, b) => b.basePrice - a.basePrice),
};

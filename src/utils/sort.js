import { SortType } from '../const.js';
import dayjs from 'dayjs';

export const sortFunctions = {
  [SortType.DAY]: (tripPoints) => tripPoints.sort((pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))),
  [SortType.TIME]: (tripPoints) => tripPoints.sort((pointA, pointB) => {
    const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
    const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
    return durationB - durationA;
  }),
  [SortType.PRICE]: (tripPoints) => tripPoints.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice),
};

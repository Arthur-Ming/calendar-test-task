import { IEvent } from '../interfaces';
/* 
const arrToMapByDate = (data: IEvent[]) => {
  return data.reduce((acc: { [key: string]: IEvent[] }, item: IEvent) => {
    acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item];
    return acc;
  }, {});
}; */

const arrToMapByDate = (data: IEvent[]) => {
  return data.reduce((acc: { [key: string]: IEvent }, item: IEvent) => {
    acc[item.date] = item;
    return acc;
  }, {});
};

export default arrToMapByDate;

import { v4 as uuid } from 'uuid';

function toFormateDate(year, month, day) {
  return new Date(Date.UTC(year, month, day)).toISOString().split('T')[0];
}

const reply = (body, timeout = 1000) => {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(body), timeout);
  });
};

const events = [
  {
    id: uuid(),
    title: 'Шашлыки',
    date: toFormateDate(2021, 8, 30),
    description: '',
    participantsNames: ['Филипп Коров', 'Дмитрий Табасков'],
  },
  {
    id: uuid(),
    title: 'Летний лагерь',
    date: toFormateDate(2021, 9, 15),
    description: '',
    participantsNames: ['Алексей Маральный'],
  },
  {
    id: uuid(),
    title: 'Аква кутеж',
    date: toFormateDate(2021, 9, 18),
    description: '',
    participantsNames: ['Михаил Шустин', 'Владимир Пупкин', 'Дмитрий Медев'],
  },
  {
    id: uuid(),
    title: 'Шашлыки',
    date: toFormateDate(2022, 8, 1),
    description: '',
    participantsNames: ['Филипп Коров', 'Дмитрий Табасков'],
  },
  {
    id: uuid(),
    title: 'Летний лагерь',
    date: toFormateDate(2022, 8, 15),
    description: '',
    participantsNames: ['Алексей Маральный'],
  },
  {
    id: uuid(),
    title: 'Аква кутеж',
    date: toFormateDate(2022, 8, 18),
    description: '',
    participantsNames: ['Михаил Шустин', 'Владимир Пупкин', 'Дмитрий Медев'],
  },
];

const api = {
  get() {
    return reply(events);
  },
};

export default api;

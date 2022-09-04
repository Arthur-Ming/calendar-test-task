import { v4 as uuid } from 'uuid';

function toFormateDate(year, month, day) {
  return new Date(Date.UTC(year, month, day)).toISOString().split('T')[0];
}

const reply = (body, timeout = 1000) => {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(body), timeout);
  });
};

const replyErr = (body, timeout = 1000) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject(body), timeout);
  });
};

const events = [
  {
    id: uuid(),
    title: 'Шашлыки',
    date: toFormateDate(2021, 8, 30),
    description: 'Шашлыки',
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
    description: 'Шашлыки',
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

  {
    id: uuid(),
    title: 'Митинг',
    date: toFormateDate(2020, 1, 30),
    description: '',
    participantsNames: ['Филипп Коров', 'Дмитрий Табасков'],
  },
  {
    id: uuid(),
    title: 'Летний лагерь',
    date: toFormateDate(2020, 2, 12),
    description: '',
    participantsNames: ['Алексей Маральный'],
  },
  {
    id: uuid(),
    title: 'Аква кутеж',
    date: toFormateDate(2021, 5, 25),
    description: '',
    participantsNames: ['Михаил Шустин', 'Владимир Пупкин', 'Дмитрий Медев'],
  },
  {
    id: uuid(),
    title: 'Шашлыки',
    date: toFormateDate(2022, 11, 1),
    description: '',
    participantsNames: ['Филипп Коров', 'Дмитрий Табасков'],
  },
  {
    id: uuid(),
    title: 'Летний лагерь',
    date: toFormateDate(2020, 8, 5),
    description: '',
    participantsNames: ['Алексей Маральный'],
  },
  {
    id: uuid(),
    title: 'Аква кутеж',
    date: toFormateDate(2020, 8, 8),
    description: '',
    participantsNames: ['Михаил Шустин', 'Владимир Пупкин', 'Дмитрий Медев'],
  },
];

const api = {
  get() {
    return reply(events);
  },
  post({ title, date, description = '', participantsNames = [] }) {
    const newEvent = {
      id: uuid(),
      title,
      date,
      description,
      participantsNames,
    };
    events.push(newEvent);
    return reply(newEvent);
  },
  put(id, newDescription = '') {
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      replyErr('error');
    }
    events[eventIndex] = {
      ...events[eventIndex],
      description: newDescription,
    };

    return reply(events[eventIndex]);
  },
};

export default api;

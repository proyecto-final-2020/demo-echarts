const last = arr => arr[arr.length - 1];

export const getNextDates = size => {
  const dates = [];
  const oneDay = 24 * 3600 * 1000;
  const baseDate = new Date();
  for (let i = 0; i < size; i++) {
    const now = new Date(baseDate.getTime() + oneDay * i);
    dates.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].reverse().join('/'));
  }
  return dates;
}


export const generateRandomData = dates => {
  const seed = Math.random() * 300;
  const data = [];
  for (const _ of dates) {
    const sumTerm = last(data) || seed;
    data.push(Math.round((Math.random() - 0.5) * 20 + sumTerm));
  }
  return data;
};

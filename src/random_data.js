const last = arr => arr[arr.length - 1];

export const getNextSeconds = size => {
  const dates = [];
  const oneSecond = 1000;
  const baseDate = new Date(Math.ceil(Date.now() / oneSecond) * oneSecond);
  for (let i = 0; i < size; i++) {
    const now = new Date(baseDate.getTime() + oneSecond * i);
    dates.push(now.toISOString());
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

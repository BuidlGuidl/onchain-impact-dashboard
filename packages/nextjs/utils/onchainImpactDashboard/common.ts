export const abbreviateNumber = (num: number) => {
  if (num >= 1000000) {
    return Number((num / 1000000).toFixed(2)) + "m";
  }
  if (num >= 1000) {
    return Math.round(num / 1000) + "k";
  } else {
    return num.toString();
  }
};

export const getTargetDate = (date: Date, filter: string) => {
  if (filter.includes(",")) {
    return filter.split(",");
  }
  date.setDate(date.getDate() - parseInt(filter));
  const month = date.getUTCMonth() + 1;
  const stringMonth = month > 10 ? `${month}` : `0${month}`;
  const day = date.getUTCDate();
  const stringDay = day > 10 ? `${day}` : `0${day}`;
  const year = date.getUTCFullYear();
  return [`${year}${stringMonth}${stringDay}`];
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString).toDateString();
  return `${date}`;
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i: number) => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

export const stringToColor = (str: string) => {
  const hash = hashString(str);
  const color = intToRGB(hash);
  return `#${color}`;
};

export const stringToRGBA = (str: string, opacity: number) => {
  const hash = hashString(str);
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

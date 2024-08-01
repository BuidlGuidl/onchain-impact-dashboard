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
    hash = Math.abs(str.charCodeAt(i) + ((hash << 5) - hash));
  }
  return hash;
};

const intToRGB = (i: number) => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

export const stringToColor = (str: string): string => {
  const hash = hashString(str);
  const color = intToRGB(hash);
  if (!isColorWithinRange(color)) {
    return stringToColor(str + "a");
  }
  console.log(`#${color}`);
  return `#${color}`;
};

export const hexStringToRGBA = (hex: string, opacity: number): string => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const isColorWithinRange = (hexColor: string) => {
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  for (const color of [r, g, b]) {
    if (color < 31 || color > 223) {
      return false;
    }
  }
  return true;
};

export const yAxisFormatter = function (this: { value: number }): string | number {
  let formatted;
  if (this.value >= 1000000) {
    formatted = (this.value / 1000000).toFixed(2);
    return formatted + "m";
  } else if (this.value >= 1000) {
    formatted = (this.value / 1000).toFixed(1);
    return formatted.endsWith(".0") ? (this.value / 1000).toFixed(0) + "k" : formatted + "k";
  } else {
    return this.value;
  }
};

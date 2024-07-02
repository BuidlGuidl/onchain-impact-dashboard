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

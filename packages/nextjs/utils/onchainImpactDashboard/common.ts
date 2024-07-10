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

export const METRICS = [
  {
    label: "Impact Index",
    value: "impact_index",
  },
  {
    label: "Trusted users",
    value: "high_activity_address_count_90_days",
  },
  {
    label: "Gas Fees",
    value: "gas_fees_sum",
  },
  {
    label: "Users Onboarded",
    value: "new_address_count_90_days",
  },
  {
    label: "Recurrent Users",
    value: "returning_address_count_90_days",
  },
  {
    label: "Transactions",
    value: "transaction_count",
  },
];

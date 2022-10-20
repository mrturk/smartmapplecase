export const getWeekday = (date: Date, getOnlyDayName: boolean = false) => {
  const weekday = new Date(date).toLocaleString(
    "tr-TR",
    getOnlyDayName
      ? {
          weekday: "long",
        }
      : {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          // hour: "numeric",
          // minute: "numeric",
        }
  );
  return weekday;
};

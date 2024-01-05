import { format, isToday } from "date-fns";

export const formatDate = (date: string | number) => {
  const convertedDate = new Date(date);

  return format(
    convertedDate,
    isToday(convertedDate) ? "HH:mm" : "dd MMM HH:mm"
  );
};

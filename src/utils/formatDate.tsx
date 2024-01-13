import { format, isToday } from "date-fns";

export const formatDate = (seconds: number) => {
  const milliseconds = seconds * 1000;

  return format(milliseconds, isToday(milliseconds) ? "HH:mm" : "dd MMM HH:mm");
};

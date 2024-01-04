const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export const dateString =
  currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

export const timestamp = currentDate.toLocaleTimeString([], {
  timeStyle: "medium",
});

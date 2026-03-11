

export const formatDate = (date, showTime = true) => {
  if (!date) return "TBA";
  const createdAt = new Date(date);
  const locale = navigator.language;

  const day = createdAt.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(
    createdAt,
  );
  const year = createdAt.getFullYear();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();

  const get12hrs = hour > 12 ? hour - 12 : hour;

  const amOrPm = hour >= 12 ? "PM" : "AM";
  if (showTime) return `${day} ${month}, ${year} | ${get12hrs}:${min}${amOrPm}`
  return `${day} ${month}, ${year} `;
};
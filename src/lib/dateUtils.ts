export function getTimestamp(date: Date | number | string) {
  if (date instanceof Date) {
    return Number(date);
  } else if (typeof date === "number") {
    return date;
  } else if (typeof date === "string") {
    return Date.parse(date) / 1000;
  }
  return date;
}

export function formatJallali(
  date: number | string,
  variant: "short" | "long" | "medium" = "short"
) {
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  if (variant === "medium") {
    options = {
      dateStyle: "medium",
      timeStyle: "medium",
    };
  }
  if (variant === "long") {
    options = {
      dateStyle: "long",
      timeStyle: "long",
    };
  }
  if (typeof date === "string") {
    return new Intl.DateTimeFormat("fa-IR", options).format(new Date(date));
  } else {
    return new Intl.DateTimeFormat("fa-IR", options).format(getTimestamp(date));
  }
}

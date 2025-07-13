export default function formatDate(isoString: Date, sort?: boolean) {
  if (sort)
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
    });
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

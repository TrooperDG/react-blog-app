export default function getTimeAgo(timestamp) {
  const now = new Date();
  const commentDate = new Date(timestamp);
  const seconds = Math.floor((now - commentDate) / 1000);

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1) {
    return interval + " year" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1) {
    return interval + " month" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) {
    return interval + " day" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) {
    return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) {
    return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
  }

  if (seconds <= 1) return "just now";

  return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
}

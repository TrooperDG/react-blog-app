export default function debounce(func, delay = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId); // Reset the timer
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

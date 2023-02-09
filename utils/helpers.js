module.exports = {
  format_date: (date) => {
    // Format date in the MM/DD/YYYY format
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // Format large numbers with commas as thousands separators
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji based on a random number
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
};

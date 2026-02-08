const deadlines = document.querySelectorAll('.deadline');

function updateDeadlines() {
  const today = new Date();

  deadlines.forEach((item) => {
    const dateString = item.getAttribute('data-date');
    const deadlineDate = new Date(dateString);

    const diffTime = deadlineDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const countdownText = item.querySelector('.countdown');

    // If date has passed
    if (daysLeft < 0) {
      countdownText.textContent = 'Expired';
      item.classList.add('red');
      return;
    }

    countdownText.textContent = `${daysLeft} days left`;

    // Remove old colors
    item.classList.remove('green', 'yellow', 'red');

    // Apply colors
    if (daysLeft > 13) {
      item.classList.add('green');
    } else if (daysLeft > 6) {
      item.classList.add('yellow');
    } else {
      item.classList.add('red');
    }
  });
}

// Run once on load
updateDeadlines();

// Update every day (optional)
setInterval(updateDeadlines, 1000 * 60 * 60);

document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
  // Load the state of THIS checkbox
  const saved = localStorage.getItem(cb.id);
  if (saved === 'true') cb.checked = true;

  // Save the state of THIS checkbox individually
  cb.addEventListener('change', () => {
    localStorage.setItem(cb.id, cb.checked);
  });
});

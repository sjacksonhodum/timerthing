// Function to calculate the progress of a given time period
function calculateProgress(startDate, endDate) {
  const currentDate = new Date();
  const totalTime = endDate - startDate;
  const elapsedTime = currentDate - startDate;
  const remainingTime = endDate - currentDate;

  const progress = (elapsedTime / totalTime) * 100;
  const remainingProgress = (remainingTime / totalTime) * 100;

  return { progress, remainingProgress, elapsedTime, remainingTime };
}

// Function to format the time in days, hours, minutes, and seconds
function formatTime(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function updateProgress() {
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);

  // Calculate remaining time for School Week, Week, and Break
  const schoolEndDate = new Date(startDate);
  schoolEndDate.setDate(startDate.getDate() + (5 - startDate.getDay())); // Friday

  const weekEndDate = new Date(startDate);
  weekEndDate.setDate(startDate.getDate() + (7 - startDate.getDay())); // Sunday

  // Break period (from start to end date)
  const breakStartDate = new Date(startDate);
  const breakEndDate = new Date(endDate);

  const schoolProgress = calculateProgress(startDate, schoolEndDate);
  const weekProgress = calculateProgress(startDate, weekEndDate);
  const breakProgress = calculateProgress(breakStartDate, breakEndDate);

  // Update progress bars for remaining time
  document.getElementById('school-progress').value = schoolProgress.remainingProgress;
  document.getElementById('week-progress').value = weekProgress.remainingProgress;
  document.getElementById('break-progress').value = breakProgress.remainingProgress;

  // Update progress bars for completed time
  document.getElementById('school-progress-completed').value = schoolProgress.progress;
  document.getElementById('week-progress-completed').value = weekProgress.progress;
  document.getElementById('break-progress-completed').value = breakProgress.progress;

  // Update the text for remaining time
  document.getElementById('school-time').textContent = `Time Remaining: ${formatTime(schoolProgress.remainingTime)}`;
  document.getElementById('week-time').textContent = `Time Remaining: ${formatTime(weekProgress.remainingTime)}`;
  document.getElementById('break-time').textContent = `Time Remaining: ${formatTime(breakProgress.remainingTime)}`;

  // Update the text for completed time
  document.getElementById('school-time-completed').textContent = `Time Completed: ${formatTime(schoolProgress.elapsedTime)}`;
  document.getElementById('week-time-completed').textContent = `Time Completed: ${formatTime(weekProgress.elapsedTime)}`;
  document.getElementById('break-time-completed').textContent = `Time Completed: ${formatTime(breakProgress.elapsedTime)}`;
}

// Update progress every second
setInterval(updateProgress, 1000);

// Initial update
updateProgress();

// Form submission handling
document.getElementById('date-form').addEventListener('submit', function(e) {
  e.preventDefault();
  updateProgress();
});

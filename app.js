// Function to calculate the progress of a given time period
function calculateProgress(startDate, endDate) {
  const currentDate = new Date();
  const totalTime = endDate - startDate;
  const elapsedTime = currentDate - startDate;
  const remainingTime = endDate - currentDate;
  const progress = Math.max(0, (elapsedTime / totalTime) * 100);
  const remainingProgress = Math.max(0, (remainingTime / totalTime) * 100);
  return { progress, remainingProgress, elapsedTime, remainingTime };
}

// Function to format time in days, hours, minutes, and seconds
function formatTime(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to update progress
function updateProgress() {
  const currentDate = new Date();
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);

  // Calculate school week progress (reset weekly)
  const schoolStartDate = new Date(startDate);
  const schoolEndDate = new Date(schoolStartDate);
  schoolEndDate.setDate(schoolStartDate.getDate() + 5 - schoolStartDate.getDay()); // Friday of the same week

  if (currentDate > schoolEndDate) {
    // If the current week ends, reset for the next week
    schoolStartDate.setDate(schoolEndDate.getDate() + 1); // Start from next week
    schoolEndDate.setDate(schoolStartDate.getDate() + 5 - schoolStartDate.getDay());
  }

  // Calculate week progress (reset weekly)
  const weekStartDate = new Date(startDate);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 7 - weekStartDate.getDay()); // Sunday of the week

  if (currentDate > weekEndDate) {
    weekStartDate.setDate(weekEndDate.getDate() + 1); // Start from next week
    weekEndDate.setDate(weekStartDate.getDate() + 7 - weekStartDate.getDay());
  }

  // Calculate break progress (fixed start and end)
  const breakStartDate = new Date(startDate);
  const breakEndDate = new Date(endDate);

  const schoolProgress = calculateProgress(schoolStartDate, schoolEndDate);
  const weekProgress = calculateProgress(weekStartDate, weekEndDate);
  const breakProgress = calculateProgress(breakStartDate, breakEndDate);

  // Update progress bars
  document.getElementById('school-progress').value = schoolProgress.remainingProgress;
  document.getElementById('week-progress').value = weekProgress.remainingProgress;
  document.getElementById('break-progress').value = breakProgress.remainingProgress;

  document.getElementById('school-progress-completed').value = schoolProgress.progress;
  document.getElementById('week-progress-completed').value = weekProgress.progress;
  document.getElementById('break-progress-completed').value = breakProgress.progress;

  // Update remaining time text
  document.getElementById('school-time').textContent = `Time Remaining: ${formatTime(schoolProgress.remainingTime)}`;
  document.getElementById('week-time').textContent = `Time Remaining: ${formatTime(weekProgress.remainingTime)}`;
  document.getElementById('break-time').textContent = `Time Remaining: ${formatTime(breakProgress.remainingTime)}`;

  // Update completed time text
  document.getElementById('school-time-completed').textContent = `Time Completed: ${formatTime(schoolProgress.elapsedTime)}`;
  document.getElementById('week-time-completed').textContent = `Time Completed: ${formatTime(weekProgress.elapsedTime)}`;
  document.getElementById('break-time-completed').textContent = `Time Completed: ${formatTime(breakProgress.elapsedTime)}`;
}

// Update progress every second
setInterval(updateProgress, 1000);

// Initial update
updateProgress();

// Form submission handling
document.getElementById('date-form').addEventListener('submit', function (e) {
  e.preventDefault();
  updateProgress();
});
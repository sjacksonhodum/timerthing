function updateTimers() {
    const now = new Date();

    // School Week
    const schoolWeekEnd = new Date();
    schoolWeekEnd.setDate(now.getDate() + (5 - now.getDay())); // Friday
    const schoolWeekTimeLeft = Math.max(0, schoolWeekEnd - now);
    document.getElementById("school-week-remaining").textContent = formatTime(schoolWeekTimeLeft);
    document.getElementById("school-week-completed").textContent = formatTime((5 * 24 * 60 * 60 * 1000) - schoolWeekTimeLeft);

    // Week
    const weekEnd = new Date();
    weekEnd.setDate(now.getDate() + (7 - now.getDay())); // Sunday
    const weekTimeLeft = Math.max(0, weekEnd - now);
    document.getElementById("week-remaining").textContent = formatTime(weekTimeLeft);
    document.getElementById("week-completed").textContent = formatTime((7 * 24 * 60 * 60 * 1000) - weekTimeLeft);

    // Break
    const breakEnd = new Date("2024-12-20"); // Adjust this as per your break dates
    const breakTimeLeft = Math.max(0, breakEnd - now);
    document.getElementById("break-remaining").textContent = formatTime(breakTimeLeft);
    document.getElementById("break-completed").textContent = formatTime((breakEnd - new Date("2024-12-02")) - breakTimeLeft);
}

function formatTime(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    ms %= (24 * 60 * 60 * 1000);
    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms %= (60 * 60 * 1000);
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateTimers, 1000);
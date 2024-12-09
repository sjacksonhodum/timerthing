document.addEventListener("DOMContentLoaded", () => {
    const remainingSchoolWeekEl = document.getElementById("remaining-school-week");
    const remainingWeekEl = document.getElementById("remaining-week");
    const remainingBreakEl = document.getElementById("remaining-break");
    const completedSchoolWeekEl = document.getElementById("completed-school-week");
    const completedWeekEl = document.getElementById("completed-week");
    const completedBreakEl = document.getElementById("completed-break");

    const startDate = new Date("2024-12-02");
    const endDate = new Date("2024-12-20");

    function updateTimer() {
        const now = new Date();

        // Get start and end of school week (Monday to Friday)
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const schoolWeekStart = new Date(now);
        schoolWeekStart.setDate(now.getDate() - ((currentDay + 6) % 7)); // Previous Monday
        schoolWeekStart.setHours(0, 0, 0, 0);
        const schoolWeekEnd = new Date(schoolWeekStart);
        schoolWeekEnd.setDate(schoolWeekStart.getDate() + 4); // Friday
        schoolWeekEnd.setHours(23, 59, 59, 999);

        // Get start and end of the calendar week (Sunday to Saturday)
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - currentDay); // Previous Sunday
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // Saturday
        weekEnd.setHours(23, 59, 59, 999);

        // Calculate remaining and completed time for each period
        const schoolWeekRemaining = Math.max(schoolWeekEnd - now, 0);
        const weekRemaining = Math.max(weekEnd - now, 0);
        const breakRemaining = Math.max(endDate - now, 0);

        const schoolWeekCompleted = Math.max(now - schoolWeekStart, 0);
        const weekCompleted = Math.max(now - weekStart, 0);
        const breakCompleted = Math.max(now - startDate, 0);

        // Format time as days, hours, minutes, and seconds
        function formatTime(ms) {
            const days = Math.floor(ms / (1000 * 60 * 60 * 24));
            const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((ms % (1000 * 60)) / 1000);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // Update remaining time
        remainingSchoolWeekEl.textContent = formatTime(schoolWeekRemaining);
        remainingWeekEl.textContent = formatTime(weekRemaining);
        remainingBreakEl.textContent = formatTime(breakRemaining);

        // Update completed time
        completedSchoolWeekEl.textContent = formatTime(schoolWeekCompleted);
        completedWeekEl.textContent = formatTime(weekCompleted);
        completedBreakEl.textContent = formatTime(breakCompleted);

        // Update progress bars
        function updateProgressBar(el, completed, total) {
            const percentage = Math.min((completed / total) * 100, 100);
            el.style.width = `${percentage}%`;
        }

        updateProgressBar(
            document.querySelector("#remaining-school-week + .progress-bar"),
            schoolWeekCompleted,
            schoolWeekCompleted + schoolWeekRemaining
        );
        updateProgressBar(
            document.querySelector("#remaining-week + .progress-bar"),
            weekCompleted,
            weekCompleted + weekRemaining
        );
        updateProgressBar(
            document.querySelector("#remaining-break + .progress-bar"),
            breakCompleted,
            breakCompleted + breakRemaining
        );
    }

    // Update the timer every second
    updateTimer();
    setInterval(updateTimer, 1000);
});
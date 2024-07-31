document.addEventListener("DOMContentLoaded", function() {
    const daysOfWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const daysOfWeekContainer = document.getElementById("daysOfWeek");
    const calendarDaysContainer = document.getElementById("calendarDays");
    const currentMonthElement = document.getElementById("currentMonth");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const backToDashboardButton = document.getElementById("backToDashboard");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementsByClassName("close")[0];
    const eventForm = document.getElementById("eventForm");
    const eventDateInput = document.getElementById("eventDate");
    const eventTitleInput = document.getElementById("eventTitle");

    let currentDate = new Date();

    function updateCalendar() {
        calendarDaysContainer.innerHTML = "";
        currentMonthElement.textContent = currentDate.toLocaleString("de-DE", { month: "long", year: "numeric" });

        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        let startDay = firstDayOfMonth.getDay() - 1;
        if (startDay < 0) startDay = 6; // Sonntag auf Montag anpassen

        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("date");
            calendarDaysContainer.appendChild(emptyCell);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const dateElement = document.createElement("div");
            dateElement.classList.add("date");
            dateElement.textContent = i;
            dateElement.addEventListener("click", () => openModal(i));
            const events = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), i);
            events.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event");
                eventElement.textContent = event.title;
                dateElement.appendChild(eventElement);
            });
            calendarDaysContainer.appendChild(dateElement);
        }
    }

    function openModal(day) {
        modal.style.display = "block";
        eventDateInput.value = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    }

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    eventForm.onsubmit = function(event) {
        event.preventDefault();
        const [year, month, day] = eventDateInput.value.split('-');
        saveEvent(parseInt(year), parseInt(month), parseInt(day), eventTitleInput.value);
        updateCalendar();
        modal.style.display = "none";
        eventTitleInput.value = "";
    }

    function getEventsForDate(year, month, day) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        return events.filter(event => event.year === year && event.month === month && event.day === day);
    }

    function saveEvent(year, month, day, title) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.push({ year, month, day, title });
        localStorage.setItem("events", JSON.stringify(events));
    }

    daysOfWeek.forEach(day => {
        let dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;
        daysOfWeekContainer.appendChild(dayElement);
    });

    prevMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    backToDashboardButton.addEventListener("click", () => {
        window.location.href = 'DashboardBN1.html';
    });

    updateCalendar();
});

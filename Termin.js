document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const eventForm = document.getElementById('eventForm');
    const eventDate = document.getElementById('eventDate');
    const eventStartTime = document.getElementById('eventStartTime');
    const eventEndTime = document.getElementById('eventEndTime');
    const eventDescription = document.getElementById('eventDescription');
    const deleteEventButton = document.getElementById('deleteEvent');

    let currentDate = new Date();
    let currentEventElement = null;

    function renderCalendar(date) {
        calendar.innerHTML = '';

        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let calendarHTML = '';

        // Add previous month's days
        for (let i = firstDay; i > 0; i--) {
            calendarHTML += `<div class="day prev-month">${daysInPrevMonth - i + 1}</div>`;
        }

        // Add current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            calendarHTML += `<div class="day" data-date="${year}-${month + 1}-${i}">${i}</div>`;
        }

        // Add next month's days
        const remainingDays = 42 - (firstDay + daysInMonth);
        for (let i = 1; i <= remainingDays; i++) {
            calendarHTML += `<div class="day next-month">${i}</div>`;
        }

        calendar.innerHTML = calendarHTML;

        const days = calendar.getElementsByClassName('day');
        for (const day of days) {
            day.addEventListener('click', function() {
                openEventModal(this);
            });
        }
    }

    function openEventModal(element) {
        currentEventElement = element;
        eventDate.value = element.getAttribute('data-date');
        eventStartTime.value = '';
        eventEndTime.value = '';
        eventDescription.value = '';
        eventModal.style.display = 'flex';
    }

    closeModal.onclick = function() {
        eventModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == eventModal) {
            eventModal.style.display = 'none';
        }
    }

    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const startTime = eventStartTime.value;
        const endTime = eventEndTime.value;
        const description = eventDescription.value;

        currentEventElement.innerHTML += `<div class="event">${startTime} - ${endTime}: ${description}</div>`;

        eventModal.style.display = 'none';
    });

    deleteEventButton.addEventListener('click', function() {
        currentEventElement.innerHTML = currentEventElement.innerHTML.split('<div class="event">')[0];
        eventModal.style.display = 'none';
    });

    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});

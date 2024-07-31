document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('#calendar-container');
    const monthYearElement = document.querySelector('#month-year');
    const calendarBody = document.querySelector('.calendar-body');
    const calendarHeader = document.querySelector('.calendar-header');
    const prevMonthButton = document.querySelector('#prev-month');
    const nextMonthButton = document.querySelector('#next-month');
    const eventModal = document.querySelector('#event-modal');
    const editEventModal = document.querySelector('#edit-event-modal');
    const backButton = document.querySelector('#back-button');
    const eventTitleInput = document.querySelector('#event-title');
    const eventStartTimeInput = document.querySelector('#event-start-time');
    const eventEndTimeInput = document.querySelector('#event-end-time');
    const editEventTitleInput = document.querySelector('#edit-event-title');
    const editEventStartTimeInput = document.querySelector('#edit-event-start-time');
    const editEventEndTimeInput = document.querySelector('#edit-event-end-time');
    const saveEventButton = document.querySelector('#save-event');
    const updateEventButton = document.querySelector('#update-event');
    const deleteEventButton = document.querySelector('#delete-event');
    const cancelEventButton = document.querySelector('#cancel-event');
    const cancelEditEventButton = document.querySelector('#cancel-edit-event');

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('events')) || {};
    let currentEditDate = '';
    let currentEditIndex = -1;

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // Adjust firstDay to start from Monday
        const adjustedFirstDay = (firstDay + 6) % 7;

        monthYearElement.textContent = `${currentDate.toLocaleDateString('de-DE', { month: 'long' })} ${year}`;

        calendarHeader.innerHTML = '';
        calendarBody.innerHTML = '';

        // Wochentage hinzufügen
        const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        weekdays.forEach(day => {
            const headerDiv = document.createElement('div');
            headerDiv.textContent = day;
            calendarHeader.appendChild(headerDiv);
        });

        // Leere Zellen vor dem ersten Tag des Monats hinzufügen
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarBody.appendChild(emptyDiv);
        }

        // Zellen für jeden Tag des Monats erstellen
        for (let day = 1; day <= lastDate; day++) {
            const dateString = `${year}-${month + 1}-${day}`;
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            // Aktuellen Tag hervorheben
            if (today.toDateString() === new Date(dateString).toDateString()) {
                dayDiv.classList.add('current-day');
            }

            // Ereignis-Indikator hinzufügen
            if (events[dateString]) {
                events[dateString].forEach(event => {
                    const eventTitle = document.createElement('div');
                    eventTitle.textContent = `${event.title} (${event.startTime} - ${event.endTime})`;
                    eventTitle.classList.add('event-title');
                    eventTitle.addEventListener('click', (e) => {
                        e.stopPropagation(); // Verhindert das Öffnen des Modals beim Klicken auf den Termin
                        openEditEventModal(dateString, event);
                    });
                    dayDiv.appendChild(eventTitle);
                });
            }

            dayDiv.addEventListener('click', () => openEventModal(dateString));
            calendarBody.appendChild(dayDiv);
        }
    };

    const openEventModal = (dateString) => {
        currentEditDate = dateString;
        eventModal.style.display = 'flex';
    };

    const saveEvent = () => {
        const title = eventTitleInput.value.trim();
        const startTime = eventStartTimeInput.value.trim();
        const endTime = eventEndTimeInput.value.trim();
        if (title && startTime && endTime) {
            if (!events[currentEditDate]) {
                events[currentEditDate] = [];
            }
            events[currentEditDate].push({ title, startTime, endTime });
            localStorage.setItem('events', JSON.stringify(events));
            eventTitleInput.value = '';
            eventStartTimeInput.value = '';
            eventEndTimeInput.value = '';
            eventModal.style.display = 'none';
            renderCalendar();
        }
    };

    const openEditEventModal = (dateString, event) => {
        currentEditDate = dateString;
        editEventTitleInput.value = event.title;
        editEventStartTimeInput.value = event.startTime;
        editEventEndTimeInput.value = event.endTime;
        currentEditIndex = events[dateString].indexOf(event);
        editEventModal.style.display = 'flex';
    };

    const updateEvent = () => {
        const newTitle = editEventTitleInput.value.trim();
        const newStartTime = editEventStartTimeInput.value.trim();
        const newEndTime = editEventEndTimeInput.value.trim();
        if (newTitle && newStartTime && newEndTime) {
            events[currentEditDate][currentEditIndex] = { title: newTitle, startTime: newStartTime, endTime: newEndTime };
            localStorage.setItem('events', JSON.stringify(events));
            editEventTitleInput.value = '';
            editEventStartTimeInput.value = '';
            editEventEndTimeInput.value = '';
            editEventModal.style.display = 'none';
            renderCalendar();
        }
    };

    const deleteEvent = () => {
        if (confirm("Möchten Sie diesen Termin löschen?")) {
            events[currentEditDate].splice(currentEditIndex, 1);
            if (events[currentEditDate].length === 0) {
                delete events[currentEditDate];
            }
            localStorage.setItem('events', JSON.stringify(events));
            editEventModal.style.display = 'none';
            renderCalendar();
        }
    };

    const closeEventModal = () => {
        eventModal.style.display = 'none';
    };

    const closeEditEventModal = () => {
        editEventModal.style.display = 'none';
    };

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    saveEventButton.addEventListener('click', saveEvent);
    cancelEventButton.addEventListener('click', closeEventModal);
    updateEventButton.addEventListener('click', updateEvent);
    deleteEventButton.addEventListener('click', deleteEvent);
    cancelEditEventButton.addEventListener('click', closeEditEventModal);

    backButton.addEventListener('click', () => {
        window.location.href = 'DashboardBN1.html';
    });

    // Initiale Kalenderdarstellung
    renderCalendar();
});

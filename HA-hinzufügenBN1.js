document.addEventListener('DOMContentLoaded', function() {
    const homeworkForm = document.getElementById('homeworkForm');
    const homeworkList = document.getElementById('homeworkList');
    const backButton = document.getElementById('backButton');

    // Funktion zum Hinzufügen von Hausaufgaben
    homeworkForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Standard-Formularverhalten

        const title = document.getElementById('homeworkTitle').value;
        const file = document.getElementById('homeworkFile').files[0];

        if (title && file) {
            const fileURL = URL.createObjectURL(file);
            addHomeworkToDOM(title, fileURL, file.name);
            saveHomeworks(); // Speichert die Hausaufgaben im Local Storage
            homeworkForm.reset();
        }
    });

    // Funktion zum Hinzufügen von Hausaufgaben zum DOM
    function addHomeworkToDOM(title, fileURL, fileName) {
        const listItem = document.createElement('div');
        listItem.classList.add('homework-item');
        listItem.innerHTML = `
            <p><strong>${title}</strong></p>
            <a href="${fileURL}" download="${fileName}">Dokument herunterladen</a>
            <button class="edit-btn">Bearbeiten</button>
            <button class="delete-btn">Löschen</button>
            <div class="edit-form">
                <label for="editTitle">Neuer Titel:</label>
                <input type="text" class="edit-title" value="${title}">
                <button class="save-btn">Speichern</button>
            </div>
        `;
        homeworkList.appendChild(listItem);
    }

    // Funktion zum Zurückkehren zur Dashboard-Seite
    backButton.addEventListener('click', function() {
        window.location.href = 'DashboardBN1.html'; // Ersetze dies durch den Pfad zur Dashboard-Seite
    });

    // Event-Delegation für Bearbeiten und Löschen
    homeworkList.addEventListener('click', function(event) {
        const target = event.target;
        const item = target.closest('.homework-item');

        if (target.classList.contains('delete-btn')) {
            item.remove();
            saveHomeworks(); // Aktualisiert den Local Storage
        } else if (target.classList.contains('edit-btn')) {
            const editForm = item.querySelector('.edit-form');
            editForm.style.display = 'block'; // Zeigt das Bearbeitungsformular an
        } else if (target.classList.contains('save-btn')) {
            const newTitle = item.querySelector('.edit-title').value;
            item.querySelector('strong').textContent = newTitle;
            item.querySelector('.edit-form').style.display = 'none'; // Versteckt das Bearbeitungsformular
            saveHomeworks(); // Speichert die Änderungen im Local Storage
        } else if (item) {
            // Zeigt die Bearbeiten- und Löschen-Buttons nur für das angeklickte Element
            item.classList.toggle('show-actions');
        }
    });

    // Funktion zum Speichern von Hausaufgaben im Local Storage
    function saveHomeworks() {
        const homeworks = [];
        document.querySelectorAll('.homework-item').forEach(item => {
            const title = item.querySelector('strong').textContent;
            const fileURL = item.querySelector('a').getAttribute('href');
            const fileName = item.querySelector('a').getAttribute('download');
            homeworks.push({ title, fileURL, fileName });
        });
        localStorage.setItem('homeworks', JSON.stringify(homeworks));
    }

    // Funktion zum Laden von Hausaufgaben aus dem Local Storage
    function loadHomeworks() {
        const homeworks = JSON.parse(localStorage.getItem('homeworks')) || [];
        homeworks.forEach(hw => {
            addHomeworkToDOM(hw.title, hw.fileURL, hw.fileName);
        });
    }

    loadHomeworks(); // Lädt die Hausaufgaben beim Start
});

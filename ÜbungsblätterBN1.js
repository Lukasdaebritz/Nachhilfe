document.addEventListener('DOMContentLoaded', function() {
    const exerciseForm = document.getElementById('exerciseForm');
    const exerciseList = document.getElementById('exerciseList');
    const backButton = document.getElementById('backButton');

    // Funktion zum Hinzufügen von Übungsblättern
    exerciseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Standard-Formularverhalten

        const title = document.getElementById('exerciseTitle').value;
        const file = document.getElementById('exerciseFile').files[0];

        if (title && file) {
            const fileURL = URL.createObjectURL(file);
            addExerciseToDOM(title, fileURL, file.name);
            saveExercises(); // Speichert die Übungsblätter im Local Storage
            exerciseForm.reset();
        }
    });

    // Funktion zum Hinzufügen von Übungsblättern zum DOM
    function addExerciseToDOM(title, fileURL, fileName) {
        const listItem = document.createElement('div');
        listItem.classList.add('exercise-item');
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
        exerciseList.appendChild(listItem);
    }

    // Funktion zum Zurückkehren zur Dashboard-Seite
    backButton.addEventListener('click', function() {
        window.location.href = 'DashboardBN1.html'; // Ersetze dies durch den Pfad zur Dashboard-Seite
    });

    // Event-Delegation für Bearbeiten und Löschen
    exerciseList.addEventListener('click', function(event) {
        const target = event.target;
        const item = target.closest('.exercise-item');

        if (target.classList.contains('delete-btn')) {
            item.remove();
            saveExercises(); // Aktualisiert den Local Storage
        } else if (target.classList.contains('edit-btn')) {
            const editForm = item.querySelector('.edit-form');
            editForm.style.display = 'block'; // Zeigt das Bearbeitungsformular an
        } else if (target.classList.contains('save-btn')) {
            const newTitle = item.querySelector('.edit-title').value;
            item.querySelector('strong').textContent = newTitle;
            item.querySelector('.edit-form').style.display = 'none'; // Versteckt das Bearbeitungsformular
            saveExercises(); // Speichert die Änderungen im Local Storage
        } else if (item) {
            // Zeigt die Bearbeiten- und Löschen-Buttons nur für das angeklickte Element
            item.classList.toggle('show-actions');
        }
    });

    // Funktion zum Speichern von Übungsblättern im Local Storage
    function saveExercises() {
        const exercises = [];
        document.querySelectorAll('.exercise-item').forEach(item => {
            const title = item.querySelector('strong').textContent;
            const fileURL = item.querySelector('a').getAttribute('href');
            const fileName = item.querySelector('a').getAttribute('download');
            exercises.push({ title, fileURL, fileName });
        });
        localStorage.setItem('exercises', JSON.stringify(exercises));
    }

    // Funktion zum Laden von Übungsblättern aus dem Local Storage
    function loadExercises() {
        const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        exercises.forEach(ex => {
            addExerciseToDOM(ex.title, ex.fileURL, ex.fileName);
        });
    }

    loadExercises(); // Lädt die Übungsblätter beim Start
});

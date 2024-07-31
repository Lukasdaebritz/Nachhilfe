document.getElementById('saveNoteButton').addEventListener('click', function() {
    const noteValue = parseFloat(document.getElementById('noteValue').value);
    const noteType = document.getElementById('noteType').value;

    if (isNaN(noteValue) || noteValue < 1 || noteValue > 6) {
        alert('Bitte geben Sie eine gültige Note zwischen 1 und 6 ein.');
        return;
    }

    if (noteValue && noteType) {
        addNoteToTable(noteValue, noteType);
        document.getElementById('noteValue').value = '';
        document.getElementById('noteType').value = 'Klassenarbeit';
        saveNotes();
        updateAverages();
    } else {
        alert('Bitte füllen Sie alle Felder aus.');
    }
});

document.getElementById('clearNotesButton').addEventListener('click', function() {
    clearNotes();
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'DashboardBN1.html';
});

function addNoteToTable(noteValue, noteType) {
    const tableBody = document.getElementById('notesTableBody');
    let newRow;

    newRow = document.createElement('tr');
    if (noteType === 'Klassenarbeit') {
        newRow.innerHTML = `
            <td class="note-cell note-klassenarbeit">${noteValue}<div class="note-actions">${getNoteActions()}</div></td>
            <td></td>
        `;
    } else {
        newRow.innerHTML = `
            <td></td>
            <td class="note-cell note-lk">${noteValue}<div class="note-actions">${getNoteActions()}</div></td>
        `;
    }

    tableBody.appendChild(newRow);
    attachNoteCellEvents(newRow);
}

function getNoteActions() {
    return `
        <button class="note-button note-edit" onclick="editNote()">Bearbeiten</button>
        <button class="note-button note-delete" onclick="deleteNote()">Löschen</button>
    `;
}

function attachNoteCellEvents(row) {
    const noteCells = row.querySelectorAll('.note-cell');
    noteCells.forEach(cell => {
        cell.addEventListener('click', function(event) {
            const actions = cell.querySelector('.note-actions');
            if (actions.style.display === 'block') {
                actions.style.display = 'none';
            } else {
                document.querySelectorAll('.note-actions').forEach(action => action.style.display = 'none');
                actions.style.display = 'block';
            }
        });
    });
}

function editNote() {
    const noteCell = event.target.closest('.note-cell');
    const currentNote = noteCell.childNodes[0].nodeValue.trim();
    const newNoteValue = prompt('Geben Sie die neue Note ein (1-6):', currentNote);

    if (newNoteValue !== null && newNoteValue >= 1 && newNoteValue <= 6) {
        noteCell.childNodes[0].nodeValue = newNoteValue;
        saveNotes();
        updateAverages();
    } else {
        alert('Bitte geben Sie eine gültige Note zwischen 1 und 6 ein.');
    }
}

function deleteNote() {
    const noteRow = event.target.closest('tr');
    noteRow.remove();
    saveNotes();
    updateAverages();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('#notesTableBody tr').forEach(row => {
        const klassenarbeitCell = row.querySelector('.note-klassenarbeit');
        const lkCell = row.querySelector('.note-lk');
        if (klassenarbeitCell && klassenarbeitCell.childNodes[0].nodeValue.trim()) {
            notes.push({ note: klassenarbeitCell.childNodes[0].nodeValue.trim(), type: 'Klassenarbeit' });
        }
        if (lkCell && lkCell.childNodes[0].nodeValue.trim()) {
            notes.push({ note: lkCell.childNodes[0].nodeValue.trim(), type: 'LK' });
        }
    });
    localStorage.setItem('notesBN1', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notesBN1') || '[]');
    notes.forEach(noteData => {
        addNoteToTable(noteData.note, noteData.type);
    });
    updateAverages();
}

function updateAverages() {
    const notes = JSON.parse(localStorage.getItem('notesBN1') || '[]');
    let klassenarbeitSum = 0, klassenarbeitCount = 0;
    let lkSum = 0, lkCount = 0;

    notes.forEach(noteData => {
        if (noteData.type === 'Klassenarbeit') {
            klassenarbeitSum += parseFloat(noteData.note);
            klassenarbeitCount++;
        }
        if (noteData.type === 'LK') {
            lkSum += parseFloat(noteData.note);
            lkCount++;
        }
    });

    document.getElementById('averageKlassenarbeit').textContent = `Durchschnitt Klassenarbeit: ${klassenarbeitCount > 0 ? (klassenarbeitSum / klassenarbeitCount).toFixed(2) : '--'}`;
    document.getElementById('averageLK').textContent = `Durchschnitt LK: ${lkCount > 0 ? (lkSum / lkCount).toFixed(2) : '--'}`;
}

function clearNotes() {
    document.getElementById('notesTableBody').innerHTML = ''; // Clear the table body
    localStorage.removeItem('notesBN1'); // Remove notes from local storage
    updateAverages(); // Update averages
}

// Initialize the page
loadNotes();

document.addEventListener('DOMContentLoaded', () => {
    // Button-Elemente auswählen
    const noteneintragenButton = document.getElementById('noteneintragen');
    const uebungsblaetterButton = document.getElementById('uebungsblaetter');
    const haHinzufuegenButton = document.getElementById('ha-hinzufuegen');
    const terminkalenderButton = document.getElementById('terminkalender');
    const logoutButton = document.getElementById('logout');

    // Event-Listener für Noten eintragen Button
    noteneintragenButton.addEventListener('click', () => {
        window.location.href = 'NoteneintragenBN1.html';
    });

    // Event-Listener für Übungsblätter Button
    uebungsblaetterButton.addEventListener('click', () => {
        window.location.href = 'ÜbungsblätterBN1.html';
    });

    // Event-Listener für HA hinzufügen Button
    haHinzufuegenButton.addEventListener('click', () => {
        window.location.href = 'HA-hinzufügenBN1.html';
    });

    // Event-Listener für Terminkalender Button
    terminkalenderButton.addEventListener('click', () => {
        window.location.href = 'TerminkalenderBN1.html';
    });

    // Event-Listener für Abmelden Button
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Zurück zur Anmeldeseite
    });
});
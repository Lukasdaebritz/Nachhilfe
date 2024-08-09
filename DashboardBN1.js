document.addEventListener('DOMContentLoaded', () => {
    // Button-Elemente auswählen
    const noteneintragenButton = document.getElementById('noteneintragen');
    const arbeitsblaetterButton = document.getElementById('arbeitsblaetter');
    const terminkalenderButton = document.getElementById('terminkalender');
    const haHinzufuegenButton = document.getElementById('ha-hinzufuegen'); // ID geändert
    const logoutButton = document.getElementById('logout');

    // Event-Listener für Noten eintragen Button
    noteneintragenButton.addEventListener('click', () => {
        window.location.href = 'NoteneintragenBN1.html';
    });

    // Event-Listener für Arbeitsblätter Button
    arbeitsblaetterButton.addEventListener('click', () => {
        window.location.href = 'ArbeitsblaetterBN1.html'; // Weiterleitung zur Arbeitsblätter-Seite
    });

    // Event-Listener für Terminkalender Button
    terminkalenderButton.addEventListener('click', () => {
        window.location.href = 'TerminkalenderBN1.html';
    });

    // Event-Listener für HA hinzufügen Button
    haHinzufuegenButton.addEventListener('click', () => {
        window.location.href = 'HABN1.html'; // Weiterleitung zur HABN1-Seite
    });

    // Event-Listener für Abmelden Button
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Zurück zur Anmeldeseite
    });
});
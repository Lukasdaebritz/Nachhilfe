document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Leo1' && password === 'Ab12') {
        window.location.href = 'DashboardBN1.html';
    } else if (username === 'Eva2' && password === 'Xy34') {
        window.location.href = 'DashboardBN2.html';
    } else if (username === 'Max3' && password === 'Ef56') {
        window.location.href = 'DashboardBN3.html';
    } else if (username === 'Mia4' && password === 'Qr78') {
        window.location.href = 'DashboardBN4.html';
    } else if (username === 'Tom5' && password === 'Gh90') {
        window.location.href = 'DashboardBN5.html';
    } else if (username === 'AlphaUser93' && password === 'S!cR3tP@ssw0rd1') {
        window.location.href = 'DashboardBN6.html';
    } else if (username === 'QuantumLeap21' && password === 'Q@ntumL3@p2024!') {
        window.location.href = 'DashboardBN7.html';
    } else if (username === 'MysticMaverick' && password === 'M!st1cM@v3r1ck$') {
        window.location.href = 'DashboardBN8.html';
    } else if (username === 'StellarNova88' && password === 'St3ll@rN0v@88#') {
        window.location.href = 'DashboardBN9.html';
    } else {
        alert('Ungültiger Benutzername oder Passwort');
    }
});

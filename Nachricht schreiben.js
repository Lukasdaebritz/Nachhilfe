document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const chatbox = document.getElementById('chatbox');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatbox.appendChild(messageElement);
            chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to the bottom
            messageInput.value = '';
        }
    });
});

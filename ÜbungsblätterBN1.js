document.getElementById('addTopicButton').addEventListener('click', function() {
    const topicInput = document.getElementById('topicInput').value.trim();
    if (topicInput) {
        addTopic(topicInput);
        document.getElementById('topicInput').value = '';
        saveTopics();
    } else {
        alert('Bitte geben Sie ein Thema ein.');
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'DashboardBN1.html';
});

function addTopic(title) {
    const topicId = 'topic-' + new Date().getTime();
    const topicContainer = document.createElement('div');
    topicContainer.classList.add('topic');
    topicContainer.dataset.topicId = topicId;
    topicContainer.innerHTML = `
        <div class="topic-title">
            <span>${title}</span>
            <div>
                <button class="edit" onclick="editTopic('${topicId}'); event.stopPropagation()">Bearbeiten</button>
                <button class="delete" onclick="deleteTopic('${topicId}'); event.stopPropagation()">Löschen</button>
            </div>
        </div>
        <div class="topic-files">
            <button onclick="document.getElementById('fileInput-${topicId}').click()">Datei hinzufügen</button>
            <input type="file" id="fileInput-${topicId}" data-topic-id="${topicId}" onchange="addFileToTopic(this)" multiple>
        </div>
        <div id="fileList-${topicId}"></div>
    `;
    document.getElementById('topicsContainer').appendChild(topicContainer);
}

function addFileToTopic(input) {
    const topicId = input.dataset.topicId;
    const fileListContainer = document.getElementById(`fileList-${topicId}`);
    Array.from(input.files).forEach(file => {
        const fileURL = URL.createObjectURL(file);
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.dataset.fileName = file.name;
        fileItem.dataset.fileURL = fileURL;
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <div>
                <a href="${fileURL}" download="${file.name}">Download</a>
                <button class="edit" onclick="editFile(this); event.stopPropagation()">Bearbeiten</button>
                <button class="delete" onclick="deleteFile(this); event.stopPropagation()">Löschen</button>
            </div>
        `;
        fileListContainer.appendChild(fileItem);
    });
    saveTopics();
}

function editTopic(topicId) {
    const topicTitleElement = document.querySelector(`.topic[data-topic-id="${topicId}"] .topic-title span`);
    const newTitle = prompt('Bearbeiten Sie das Thema:', topicTitleElement.textContent.trim());
    if (newTitle) {
        topicTitleElement.textContent = newTitle;
        saveTopics();
    }
}

function deleteTopic(topicId) {
    const topicElement = document.querySelector(`.topic[data-topic-id="${topicId}"]`);
    topicElement.remove();
    saveTopics();
}

function editFile(button) {
    const fileItem = button.parentElement.parentElement;
    const newFileName = prompt('Bearbeiten Sie den Dateinamen:', fileItem.querySelector('span').textContent.trim());
    if (newFileName) {
        fileItem.querySelector('span').textContent = newFileName;
        fileItem.dataset.fileName = newFileName;
        saveTopics();
    }
}

function deleteFile(button) {
    const fileItem = button.parentElement.parentElement;
    fileItem.remove();
    saveTopics();
}

function saveTopics() {
    const topics = [];
    document.querySelectorAll('.topic').forEach(topic => {
        const topicId = topic.dataset.topicId;
        const title = topic.querySelector('.topic-title span').textContent.trim();
        const files = [];
        topic.querySelectorAll('.file-item').forEach(fileItem => {
            files.push({
                name: fileItem.dataset.fileName,
                url: fileItem.dataset.fileURL
            });
        });
        topics.push({ topicId, title, files });
    });
    localStorage.setItem('topicsBN1', JSON.stringify(topics));
}

function loadTopics() {
    const topics = JSON.parse(localStorage.getItem('topicsBN1') || '[]');
    topics.forEach(topic => {
        addTopic(topic.title);
        topic.files.forEach(file => {
            const fileListContainer = document.getElementById(`fileList-${topic.topicId}`);
            if (fileListContainer) {
                const fileItem = document.createElement('div');
                fileItem.classList.add('file-item');
                fileItem.dataset.fileName = file.name;
                fileItem.dataset.fileURL = file.url;
                fileItem.innerHTML = `
                    <span>${file.name}</span>
                    <div>
                        <a href="${file.url}" download="${file.name}">Download</a>
                        <button class="edit" onclick="editFile(this); event.stopPropagation()">Bearbeiten</button>
                        <button class="delete" onclick="deleteFile(this); event.stopPropagation()">Löschen</button>
                    </div>
                `;
                fileListContainer.appendChild(fileItem);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', loadTopics);

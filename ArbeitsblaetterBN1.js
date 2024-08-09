document.addEventListener('DOMContentLoaded', () => {
    const topicForm = document.getElementById('topic-form');
    const topicInput = document.getElementById('topic-input');
    const topicList = document.getElementById('topic-list');
    const backButton = document.getElementById('back-button');

    // Load topics from localStorage
    const loadTopics = () => {
        const topics = JSON.parse(localStorage.getItem('topics')) || [];
        topicList.innerHTML = '';
        topics.forEach((topic, index) => {
            addTopicToList(topic, index);
        });
    };

    // Save topics to localStorage
    const saveTopics = (topics) => {
        localStorage.setItem('topics', JSON.stringify(topics));
    };

    // Add topic to list
    const addTopicToList = (topic, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${topic.name}</span>
            <div class="actions">
                <button onclick="editTopic(${index})">Bearbeiten</button>
                <button onclick="deleteTopic(${index})">Löschen</button>
            </div>
            <input type="file" class="file-input" data-index="${index}">
            <div class="file-list" id="file-list-${index}"></div>
        `;

        const fileInput = li.querySelector('.file-input');
        const fileList = li.querySelector(`#file-list-${index}`);

        // Load files for this topic
        topic.files.forEach((file, fileIndex) => {
            addFileToList(file, fileList, index, fileIndex);
        });

        fileInput.addEventListener('change', (e) => {
            handleFileUpload(e, index);
        });

        topicList.appendChild(li);
    };

    // Add file to list
    const addFileToList = (file, fileList, topicIndex, fileIndex) => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.innerHTML = `
            <a href="${file.url}" download="${file.name}">${file.name}</a>
            <div class="file-actions">
                <button onclick="downloadFile('${file.url}', '${file.name}')">Download</button>
                <button onclick="editFile(${topicIndex}, ${fileIndex})">Bearbeiten</button>
                <button onclick="deleteFile(${topicIndex}, ${fileIndex})">Löschen</button>
            </div>
        `;
        fileList.appendChild(fileItem);
    };

    // Handle file upload
    const handleFileUpload = (event, topicIndex) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const topics = JSON.parse(localStorage.getItem('topics')) || [];
                const topic = topics[topicIndex];

                const fileObject = {
                    name: file.name,
                    url: e.target.result
                };

                topic.files.push(fileObject);
                saveTopics(topics);

                const fileList = document.getElementById(`file-list-${topicIndex}`);
                addFileToList(fileObject, fileList, topicIndex, topic.files.length - 1);
            };
            reader.readAsDataURL(file);
        }
    };

    // Download file
    window.downloadFile = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    };

    // Edit file
    window.editFile = (topicIndex, fileIndex) => {
        const newName = prompt('Neuer Name für die Datei:', '');
        if (newName) {
            let topics = JSON.parse(localStorage.getItem('topics')) || [];
            topics[topicIndex].files[fileIndex].name = newName;
            saveTopics(topics);
            loadTopics();
        }
    };

    // Delete file
    window.deleteFile = (topicIndex, fileIndex) => {
        let topics = JSON.parse(localStorage.getItem('topics')) || [];
        topics[topicIndex].files.splice(fileIndex, 1);
        saveTopics(topics);
        loadTopics();
    };

    // Edit topic
    window.editTopic = (index) => {
        const newName = prompt('Neuer Name für das Thema:', '');
        if (newName) {
            let topics = JSON.parse(localStorage.getItem('topics')) || [];
            topics[index].name = newName;
            saveTopics(topics);
            loadTopics();
        }
    };

    // Delete topic
    window.deleteTopic = (index) => {
        let topics = JSON.parse(localStorage.getItem('topics')) || [];
        topics.splice(index, 1);
        saveTopics(topics);
        loadTopics();
    };

    // Add new topic
    topicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const topicName = topicInput.value;
        if (topicName) {
            const topics = JSON.parse(localStorage.getItem('topics')) || [];
            topics.push({ name: topicName, files: [] });
            saveTopics(topics);
            topicInput.value = '';
            loadTopics();
        }
    });

    // Go back to the dashboard
    backButton.addEventListener('click', () => {
        window.location.href = 'DashboardBN1.html';
    });

    // Initial load of topics
    loadTopics();
});

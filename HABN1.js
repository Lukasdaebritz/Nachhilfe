document.addEventListener('DOMContentLoaded', function() {
    const themeInput = document.getElementById('themeInput');
    const addThemeButton = document.getElementById('addThemeButton');
    const themeList = document.getElementById('themeList');

    // Laden und Anzeigen gespeicherter Themen und Dateien
    loadThemes();

    addThemeButton.addEventListener('click', function() {
        const themeName = themeInput.value.trim();

        if (themeName) {
            addThemeToList(themeName);
            saveTheme(themeName);
            themeInput.value = '';
            themeInput.focus();
        }
    });

    function addThemeToList(themeName) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = themeName;

        const fileInputContainer = document.createElement('div');
        fileInputContainer.classList.add('file-input-container');

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;

        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                Array.from(fileInput.files).forEach(function(file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const fileData = e.target.result;
                        addFileToList(file.name, fileData, fileList);
                        saveFile(themeName, file.name, fileData);
                    };
                    reader.readAsDataURL(file);
                });
            }
        });

        const fileList = document.createElement('ul');
        fileList.classList.add('file-list');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const editButton = document.createElement('button');
        editButton.textContent = 'Bearbeiten';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function() {
            const newThemeName = prompt('Neuen Namen eingeben:', themeName);
            if (newThemeName) {
                span.textContent = newThemeName;
                updateTheme(themeName, newThemeName);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', function() {
            themeList.removeChild(li);
            deleteTheme(themeName);
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        fileInputContainer.appendChild(fileInput);

        li.appendChild(span);
        li.appendChild(fileInputContainer);
        li.appendChild(fileList);
        li.appendChild(buttonContainer);
        themeList.appendChild(li);

        // Dateien laden, falls vorhanden
        loadFiles(themeName, fileList);
    }

    function addFileToList(fileName, fileData, fileList) {
        const fileLi = document.createElement('li');
        const fileLink = document.createElement('a');
        fileLink.href = fileData;
        fileLink.download = fileName;
        fileLink.textContent = fileName;

        const fileButtons = document.createElement('div');
        fileButtons.classList.add('file-buttons');

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.addEventListener('click', function() {
            fileLink.click();
        });

        const editFileButton = document.createElement('button');
        editFileButton.textContent = 'Bearbeiten';
        editFileButton.addEventListener('click', function() {
            const newFileName = prompt('Neuen Dateinamen eingeben:', fileName);
            if (newFileName) {
                fileLink.download = newFileName;
                fileLink.textContent = newFileName;
                updateFile(fileName, newFileName, fileData);
            }
        });

        const deleteFileButton = document.createElement('button');
        deleteFileButton.textContent = 'Löschen';
        deleteFileButton.addEventListener('click', function() {
            fileList.removeChild(fileLi);
            deleteFile(fileName);
        });

        fileButtons.appendChild(downloadButton);
        fileButtons.appendChild(editFileButton);
        fileButtons.appendChild(deleteFileButton);

        fileLi.appendChild(fileLink);
        fileLi.appendChild(fileButtons);
        fileList.appendChild(fileLi);
    }

    function saveTheme(themeName) {
        let themes = getThemes();
        themes.push({ name: themeName, files: [] });
        localStorage.setItem('themes', JSON.stringify(themes));
    }

    function loadThemes() {
        let themes = getThemes();
        themes.forEach(function(theme) {
            addThemeToList(theme.name);
        });
    }

    function deleteTheme(themeName) {
        let themes = getThemes();
        themes = themes.filter(function(theme) {
            return theme.name !== themeName;
        });
        localStorage.setItem('themes', JSON.stringify(themes));
    }

    function updateTheme(oldName, newName) {
        let themes = getThemes();
        let theme = themes.find(function(t) {
            return t.name === oldName;
        });

        if (theme) {
            theme.name = newName;
            localStorage.setItem('themes', JSON.stringify(themes));
        }
    }

    function saveFile(themeName, fileName, fileData) {
        let themes = getThemes();
        let theme = themes.find(function(t) {
            return t.name === themeName;
        });

        if (theme) {
            theme.files.push({ name: fileName, data: fileData });
            localStorage.setItem('themes', JSON.stringify(themes));
        }
    }

    function updateFile(oldFileName, newFileName, fileData) {
        let themes = getThemes();
        themes.forEach(function(theme) {
            theme.files.forEach(function(file) {
                if (file.name === oldFileName) {
                    file.name = newFileName;
                }
            });
        });
        localStorage.setItem('themes', JSON.stringify(themes));
    }

    function loadFiles(themeName, fileList) {
        let themes = getThemes();
        let theme = themes.find(function(t) {
            return t.name === themeName;
        });

        if (theme && theme.files) {
            theme.files.forEach(function(file) {
                addFileToList(file.name, file.data, fileList);
            });
        }
    }

    function deleteFile(fileName) {
        let themes = getThemes();
        themes.forEach(function(theme) {
            theme.files = theme.files.filter(function(file) {
                return file.name !== fileName;
            });
        });
        localStorage.setItem('themes', JSON.stringify(themes));
    }

    function getThemes() {
        return JSON.parse(localStorage.getItem('themes')) || [];
    }
});
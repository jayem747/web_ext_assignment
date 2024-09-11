document.addEventListener('DOMContentLoaded', function() {
    
    const injectButton = document.getElementById('injectButton');
    injectButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {action: "injectButton"},
                function(response) {
                    if (response && response.success) {
                        console.log("Button injected successfully");
                    } else {
                        console.error("Failed to inject button");
                    }
                }
            );
        });
    });

    const viewSavesButton = document.getElementById('viewSaves');
    viewSavesButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({action: "getSavedArticles"}, function(response) {
            if (response && response.savedArticles) {
                var savesContainer = document.getElementById('savesContainer');
                if (savesContainer) {
                    savesContainer.innerHTML = '';
                    
                    Object.keys(response.savedArticles).forEach(function(date) {
                        var dateHeader = document.createElement('h2');
                        dateHeader.textContent = date;
                        savesContainer.appendChild(dateHeader);

                        var table = document.createElement('table');
                        var tbody = document.createElement('tbody');

                        response.savedArticles[date].forEach(function(article) {
                            var row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${article.title}</td>
                                <td><a href="${article.url}" target="_blank">${article.url}</a></td>
                            `;
                            tbody.appendChild(row);
                        });

                        table.appendChild(tbody);
                        savesContainer.appendChild(table);
                    });
                } else {
                    console.error("savesContainer element not found");
                }
            } else {
                savesContainer.innerHTML = '<p>No saved articles.</p>';
            }
        });
    });
});

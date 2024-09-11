let savedArticles = {};

function loadSavedData() {
    chrome.storage.local.get(['savedArticles'], function(result) {
        if (result.savedArticles) {
            savedArticles = result.savedArticles;
        }
    });
}

const FILE_PATH = 'data/articles.json';

function readFile(callback) {
    chrome.storage.local.get(FILE_PATH, function(result) {
        callback(null, result[FILE_PATH]);
    });
}

function writeFile(data, callback) {
    chrome.storage.local.set({ [FILE_PATH]: data }, function() {
        callback(null, data);
    });
}

function saveToJSONFile() {
    let formattedData = {};
    
    Object.keys(savedArticles).forEach(function(key) {
        const article = savedArticles[key];
        let dateKey;
        try {
            const dateObj = new Date(article.dateTime);
            if (isNaN(dateObj.getTime())) {
                throw new Error('Invalid date string');
            }
            dateKey = dateObj.toISOString().split('T')[0];
        } catch (error) {
            console.warn('Failed to parse date:', article.dateTime);
            dateKey = new Date().toISOString().split('T')[0];
        }

        if (!formattedData[dateKey]) {
            formattedData[dateKey] = [];
        }
        formattedData[dateKey].push({
            title: article.title,
            url: article.url
        });
    });

    // Read existing data
    readFile(function(err, data) {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            // Append new data to existing data
            if (data) {
                data.push(formattedData);
            } else {
                data = [formattedData];
            }
            
            // Write updated data
            writeFile(data, function(err, data) {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('File saved successfully');
                }
            });
        }
    });
}

// Load saved data when the extension loads
loadSavedData();

function saveArticle(title, dateTime, url) {
    const currentDate = new Date().toDateString();
    console.log("Saving article:", {title, dateTime, url});
    if (!savedArticles[currentDate]) {
        savedArticles[currentDate] = [];
    }
    savedArticles[currentDate].push({
        title: title,
        dateTime: dateTime,
        url: url
    });
    
    // Save the entire savedArticles object
    chrome.storage.local.set({ savedArticles: savedArticles }, function() {
        console.log("Saved article to local storage");
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveArticle") {
        const { title, dateTime, url } = request.data;
        
        saveArticle(title, dateTime, url);
        
        // Optionally, save all articles to JSON file
        saveToJSONFile();
        
        sendResponse({ success: true });
    }
});

function getSavedArticles() {
    console.log("Sending saved articles data");
    return savedArticles;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSavedArticles") {
        sendResponse({savedArticles: savedArticles});
    }
});

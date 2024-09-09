let savedArticles = [];

// Load saved articles when the extension starts
chrome.storage.local.get(['savedArticles'], function(result) {
    if (result.savedArticles) {
        savedArticles = result.savedArticles;
    }
});

function saveArticle(title, dateTime, url) {
    chrome.storage.local.set({
        [`article_${Date.now()}`]: {
            title: title,
            dateTime: dateTime,
            url: url
        }
    });
}

function appendToFile(filename, data) {
    chrome.storage.local.set({
        filename: data
    }, function() {
        console.log(`Data appended to ${filename}`);
    });
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('Background script loaded');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message in background:", request);
    if (request.action === "saveArticle") {
        savedArticles.push(request.data);
        appendToFile('saved_articles.json', JSON.stringify(savedArticles));
        
        // Only send a response if it's explicitly asked for
        if (sendResponse && typeof sendResponse === 'function') {
            sendResponse({ success: true });
        }
    }
});


function appendToFile(filename, data) {
    chrome.fileSystem.chooseEntry({type: 'write'}, function(writableEntry) {
        if (!writableEntry) {
            console.error('No writable entry found');
            return;
        }

        writableEntry.getFile(filename, {create: false}, function(fileEntry) {
            fileEntry.createWriter(function(writer) {
                writer.seek(writer.LENGTH_AT_END);
                writer.write(data);
            }, function(error) {
                console.error('Error appending to file:', error);
            });
        }, function(error) {
            console.error('Error getting file:', error);
        });
    }, function(error) {
        console.error('Error accessing directory:', error);
    });
}
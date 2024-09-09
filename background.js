let savedArticles = [];

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
    if (request.action === "saveArticle") {
        const dateKey = new Date().toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        
        chrome.storage.local.get(['savedArticles'], function(result) {
            const articlesByDate = result.savedArticles || {};
            
            if (!articlesByDate[dateKey]) {
                articlesByDate[dateKey] = [];
            }

            articlesByDate[dateKey].push({
                title: request.data.title,
                dateTime: request.data.dateTime,
                url: request.data.url
            });

            chrome.storage.local.set({ savedArticles: articlesByDate }, function() {
                console.log(`Article saved under date: ${dateKey}`);
                
                if (sendResponse && typeof sendResponse === 'function') {
                    sendResponse({ success: true });
                }
            });
        });
    }
});

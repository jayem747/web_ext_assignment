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
        const { title, dateTime, url } = request.data;

        // Log the contents of title, dateTime, and url
        console.log("Received article details:");
        console.log("Title:", title);
        console.log("DateTime:", dateTime);
        console.log("URL:", url);

        // Save the article using the saveArticle function
        saveArticle(title, dateTime, url);

        // Send a success response if needed
        if (sendResponse && typeof sendResponse === 'function') {
            sendResponse({ success: true });
        }
    }
});

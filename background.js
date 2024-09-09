
let savedArticles = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveArticle") {
        savedArticles.push(request.data);
        saveToJSONFile(savedArticles, 'saved_articles.json');
        sendResponse({ success: true });
    }
});

function saveToJSONFile(data, filename) {
    const encodedUri = encodeURI(filename);
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
    link.setAttribute('download', filename);

    element = document.body.appendChild(link);

    link.click();

    document.body.removeChild(element);
}

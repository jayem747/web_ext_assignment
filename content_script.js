console.log("Content script injected successfully");

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message from background:", request);
    if (request.action === "injectButton") {
        injectButton();
    }
});

function injectButton() {
    console.log("Attempting to inject button");
    
    // Wait for DOM to load
    if (document.readyState !== 'loading') {
        injectButtonImmediately();
    } else {
        document.addEventListener('DOMContentLoaded', injectButtonImmediately);
    }

    function injectButtonImmediately() {
        let lastElement = document.body.lastChild;

        let button = document.createElement('button');
        button.textContent = 'Save article';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';

        document.body.appendChild(button);

        button.addEventListener('click', function() {
            console.log('Button click registered');
            
            const title = document.querySelector('.sc-3c404ba4-0.irijYp.sc-7411e22-3.dKAfIt').textContent.trim();
            const dateTime = new Date().toISOString();
            const url = window.location.href;

            chrome.runtime.sendMessage({ action: "saveArticle", data: { title, dateTime, url } });
            console.log("Data sent to background script");
        });
    }
}

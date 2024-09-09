console.log("Content script injected successfully");

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
        // Find the last text element on the page
        let lastElement = document.body.lastChild;

        // Create the button
        let button = document.createElement('button');
        button.textContent = 'Save article';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';

        // Append the button to the body
        document.body.appendChild(button);

        // Add event listener to the button
        button.addEventListener('click', function() {
            console.log('Button clicked!');
        });
    }
}

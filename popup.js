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
});

console.log("Popup script loaded");

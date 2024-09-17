console.log("Content script injected successfully");

function injectButton() {
    console.log("Attempting to inject button");
    
    // Wait for DOM to load
    if (document.readyState !== 'loading') {
        injectButtonImmediately();
    } else {
        document.addEventListener('DOMContentLoaded', injectButtonImmediately);
    }

    function injectButtonImmediately() {
        console.log("Injecting button immediately");
    }

    function injectButtonImmediately() {
        let lastElement = document.body.lastChild;

        let button = document.createElement('button');
        button.textContent = 'Save article';
        button.classList.add('save-article-button')

        document.body.appendChild(button);

        button.addEventListener('click', function() {
            console.log('Button click registered');
            
            const timeElement = document.querySelector('time[datetime]');

            const dateTimeString = timeElement ? timeElement.getAttribute('datetime') : null;
            
            if (dateTimeString) {
                const dateTime = new Date(dateTimeString);
                
                // Format the date as ISO 8601 string
                const formattedDateTime = dateTime.toISOString();
                
                const title = document.querySelector('.sc-3c404ba4-0.irijYp.sc-7411e22-3.dKAfIt').textContent.trim();
                const url = window.location.href;

                chrome.runtime.sendMessage({ action: "saveArticle", data: { title, dateTime: formattedDateTime, url } });
                console.log("Data sent to background script");
            } else {
                console.error("Could not find the publication date.");
            }
        });
    }
}

injectButton();
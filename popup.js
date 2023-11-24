let scrapeLinkedIn = document.getElementById('scrapeLinkedIn');

if (scrapeLinkedIn) {
    scrapeLinkedIn.addEventListener("click", function () {
        // Get the current active tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentPageUrl = tabs[0].url;

            // Display the current page URL in an alert
            alert("Current Page URL: " + currentPageUrl);

            // Additional alert for debugging
            alert("Button Clicked!");

            // Send a message to the background script to initiate the extraction process
            chrome.runtime.sendMessage({ action: 'extractInfo' });
        });
    });
} else {
    console.error("Element with ID 'scrapeLinkedIn' not found");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'extractInfo') {
        const usernameElement = document.querySelector('h1.text-heading-xlarge');
        const headlineElement = document.querySelector('div.text-body-medium');

        if (usernameElement && headlineElement) {
            const username = usernameElement.textContent.trim();
            const headline = headlineElement.textContent.trim();

            const dataToSend = {
                username: username,
                headline: headline
            };

            // Display the information in an alert
            alert(`Username: ${username}\nHeadline: ${headline}`);

            // Optionally, you can also store the data in chrome.storage.local
            chrome.storage.local.set({ linkedInInfo: dataToSend });

            // Send a POST request to the Python server
            fetch('http://localhost:5000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Server response:', data);
                    // Handle the server response as needed
                })
                .catch(error => {
                    console.error('Error sending data to server:', error);
                });
        } else {
            console.error('Error: Unable to find elements on the LinkedIn page');
        }
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'extractInfo') {
        const usernameElement = document.querySelector('h1.text-heading-xlarge');
        const headlineElement = document.querySelector('div.text-body-medium');

        if (usernameElement && headlineElement) {
            const username = usernameElement.textContent.trim();
            const headline = headlineElement.textContent.trim();

            const curlPrompt = {
                prompt: {
                    text: `You are Yash Maurya, a Privacy Engineering Graduate student at Carnegie Mellon University. 
You are dedicated to creating privacy-conscious AI solutions and ensuring the ethical use 
of data. Your mission is to design robust privacy systems for the greater good of society.
Your key interests are in Federated Learning, Differential Privacy, Explainable and Responsible AI.

Write a concise Linkedin message to ${username}.
Short intro about ${username}: ${headline}.

Be respectful and strictly limit your message to 300 characters. 
Leave out the greeting in the end to save characters and convey more information.
Only use the first name.

Given are a few examples for your reference.

Example:
Hi Omid,
I'm a Privacy Engineering grad student at CMU, specializing in PETs like Differential Privacy, 
Federated Learning, Secure MPC, and Responsible AI. I'm currently exploring a Differentially 
Private implementation of ShapleyFL to privately mitigate the harms of adversarial attacks 
by clients.

Example 2:
Hi Sameer,
I'm a Privacy Engineering grad student at CMU, specializing in PETs 
like Differential Privacy, Federated Learning, Secure MPC, and Responsible AI. 
I'm eager to gain practical experience and would love to explore internship opportunities 
at Ardent Privacy. I look forward to learning more.

Example 3:
Hi Casey,
I'm currently a Privacy Engineering graduate student at CMU, 
where I've acquired a solid theoretical foundation in Privacy, Policy, Law, and Technology. My 
focus areas encompass PETs such as Differential Privacy, Federated Learning, Secure MPC, and 
Responsible AI. Now, I'm eager to apply this knowledge in a practical setting.
I came across Ketch and am curious if there are any opportunities for privacy-related 
summer internships. I'd love to learn more about the exciting work happening at Ketch.`
                }
            };

            fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(curlPrompt)
            })
            .then(response => response.json())
            .then(data => {
                const generatedText = data.candidates[0].output;
                console.log(generatedText);
                navigator.clipboard.writeText(generatedText)
                .then(() => {
                    console.log('Text copied to clipboard:', generatedText);
                    // You can optionally provide user feedback or perform other actions here
                })
                .catch(err => {
                    console.error('Unable to copy text to clipboard', err);
                    // Handle the error appropriately
                });
                alert(`Generated Text and put it on your clipboard!`);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        } else {
            console.error('Error: Unable to find elements on the LinkedIn page');
        }
    }
});

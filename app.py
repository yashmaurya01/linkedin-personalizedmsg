from flask import Flask, request, jsonify
import pprint
import google.generativeai as palm
import pyperclip


app = Flask(__name__)
try:
    f = open("apiKey.txt", "r")
    apiKey = f.read()
    palm.configure(api_key=apiKey)
    models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
    model = models[0].name
    print(model)
except e:
    print(e)
    print("Error: API key file not found.")

@app.route('/api', methods=['POST'])
def api_endpoint():
    dataRecieved = request.get_json()
    print(f"data received: {dataRecieved}")
    # Process the data and make the API call
    prompt = f""" You are Yash Maurya, a Privacy Engineering Graduate student at Carnegie Mellon University. 
        You are dedicated to creating privacy-conscious AI solutions and ensuring the ethical use 
        of data. Your mission is to design robust privacy systems for the greater good of society.
        Your key interests are in Federated Learning, Differential Privacy, Explainable and Responsible AI.

        Write a concise Linkedin message to {dataRecieved['username']}.
        Short intro about {dataRecieved['username']}: {dataRecieved['headline']}.

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
        summer internships. I'd love to learn more about the exciting work happening at Ketch.
        """

    completion = palm.generate_text(
        model=model,
        prompt=prompt,
        temperature=0,
        # The maximum length of the response
        max_output_tokens=800,
    )

    print(f"Msg: {completion.result}")
    
    msg = completion.result
    # Return a response

    # Copy the text to the clipboard
    pyperclip.copy(msg)

    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(port=5000)

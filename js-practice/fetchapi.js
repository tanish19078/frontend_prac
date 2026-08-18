import "dotenv/config";

const jokeUrl = "https://official-joke-api.appspot.com/random_joke";

fetch(jokeUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log("Joke:", data.setup);
        console.log("Punchline:", data.punchline);
    })
    .catch((error) => {
        console.log("Error fetching joke:", error);
    });


const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function askGroq(question) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + GROQ_API_KEY,
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "user", content: question }
            ],
        }),
    });

    const data = await response.json();
    console.log("AI Response:", data.choices[0].message.content);
}

askGroq("why did reactjs came when we already have html and javascript? also drop the temperature variable to 0.5 for this request");
askGroq("why did reactjs came when we already have html and javascript?");
import express from "express";

const router = express.Router();

const extractQuestions = (content) => {
    const questionRegex = /Question \d+:\s*(.+?)\s*Answer options:\s*(A\..+?)(?=\n\n|$)/gs;
    const questions = [];
    let match;

    while ((match = questionRegex.exec(content)) !== null) {
        const questionText = match[1].trim();
        const optionsText = match[2].trim();
        const options = optionsText.split('\n').map(opt => opt.trim());

        let correctAnswer = null;
        const formattedOptions = options.map(option => {
            if (option.includes('*')) {
                correctAnswer = option.replace('*', '').trim();
                return option.replace('*', '').trim();
            }
            return option;
        });

        questions.push({
            question: questionText,
            options: formattedOptions,
            correctAnswer: correctAnswer
        });
    }

    return questions;
};

router.post("/generate-course", async (req, res) => {
    const { courseTitle } = req.body;

    if (!courseTitle) {
        return res.status(400).send({ error: "Course title is required" });
    }

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.Huggingface}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: `generate (QCM) question on the topic of ${courseTitle}".and put * on the correct ones and return them to me as a string `,
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON from the response
        console.log(data);
        const generatedContent = data[0].generated_text; // Adjust this line based on the actual response structure
        console.log(generatedContent);

        const questions = extractQuestions(generatedContent);

        res.send({ course: generatedContent, questions: questions });
    } catch (error) {
        console.error("Error generating course content:", error);
        res.status(500).send({ error: "Error generating course content" });
    }
});

export default router;

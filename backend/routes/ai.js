const express = require('express');
const router = express.Router();

router.post('/ask', async (req, res) => {
    try {
        const { question, context } = req.body;

        // This is where Hugging Face API integration would go.
        // For now, if the API KEY is not set, we mock the response to guarantee it works for the demo.
        const apiKey = process.env.HUGGINGFACE_API_KEY;

        if (!apiKey) {
            // Mock AI behavior
            let answer = "That's a great question! Based on the context, components allow you to break the UI down into reusable pieces. Try building a simple component that returns a standard HTML element to practice.";

            if (question.toLowerCase().includes('props')) {
                answer = "Props (short for properties) allow you to pass data from a parent component to a child component. They are read-only and cannot be modified by the child.";
            }

            return res.json({ answer: `${answer} (Mocked - Add HuggingFace API key to backend/.env)` });
        }

        // Real Hugging Face integration
        const hfRes = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                inputs: `Context: ${context}\nQuestion: ${question}\nAnswer:`,
            }),
        });

        const data = await hfRes.json();

        if (data && data[0] && data[0].generated_text) {
            return res.json({ answer: data[0].generated_text });
        } else {
            return res.json({ answer: "The AI model is currently loading or unavilable. Please wait and try again." });
        }

    } catch (error) {
        console.error("AI API Error:", error);
        res.status(500).json({ error: "Failed to fetch response from AI." });
    }
});

module.exports = router;

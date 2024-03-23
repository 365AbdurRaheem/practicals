const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(express.static('public');
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submissions
app.post('/feedback', async (req, res) => {
    const feedback = req.body.feedback;
    const token = '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'; // Replace with your GitHub personal access token
    const owner = '365AbdurRaheem'; // Replace with your GitHub username
    const repo = 'practicals'; // Replace with your repository name
    const filePath = 'feedback.txt';

    // Construct the request URL
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        // Fetch current content of the file
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const data = await response.json();
        const existingContent = Buffer.from(data.content, 'base64').toString('utf-8');

        // Append new feedback to the file content
        const updatedContent = existingContent + '\n' + feedback;

        // Encode the updated content to base64
        const encodedContent = Buffer.from(updatedContent).toString('base64');

        // Construct the request body
        const requestBody = {
            message: 'Add feedback',
            content: encodedContent,
            sha: data.sha,
        };

        // Send a PUT request to update the file
        await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        res.send('Feedback added successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to add feedback.');
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    })
    res.redirect("public/index.htm");
}).listen(PORT);
console.log("Listening on "+PORT);
                

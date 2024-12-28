import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { TRELLO_API_KEY, TRELLO_API_SECRET } = process.env;
    const cardId = req.query.cardId;
    const token = req.query.token; // Use token provided by the client or request

    try {
        if (!TRELLO_API_KEY || !TRELLO_API_SECRET) {
            throw new Error('Missing Trello API Key or Secret');
        }

        if (!token) {
            // If no token is provided, redirect the user to authenticate
            const authUrl = `https://trello.com/1/authorize?expiration=1hour&name=YourAppName&scope=read,write&response_type=token&key=${TRELLO_API_KEY}`;
            return res.status(401).json({
                error: 'Missing token. Please authenticate.',
                authUrl,
            });
        }

        const trelloUrl = `https://api.trello.com/1/cards/${cardId}/checklists?key=${TRELLO_API_KEY}&token=${token}`;
        const response = await fetch(trelloUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Trello API Error:', errorText);

            // Handle expired token by redirecting to authentication
            if (response.status === 401) {
                const authUrl = `https://trello.com/1/authorize?expiration=1hour&name=YourAppName&scope=read,write&response_type=token&key=${TRELLO_API_KEY}`;
                return res.status(401).json({
                    error: 'Token expired. Please authenticate.',
                    authUrl,
                });
            }

            return res.status(response.status).json({ error: `Trello API Error: ${errorText}` });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).json({ error: error.message });
    }
}

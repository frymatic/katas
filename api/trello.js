export default async function handler(req, res) {
    try {
        const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;
        const cardId = req.query.cardId;

        if (!TRELLO_API_KEY || !TRELLO_API_TOKEN) {
            throw new Error('Missing Trello API Key or Token');
        }

        const trelloUrl = `https://api.trello.com/1/cards/${cardId}/checklists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;
        const response = await fetch(trelloUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Trello API Error:', errorText);
            return res.status(response.status).json({ error: `Trello API Error: ${errorText}` });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).json({ error: error.message });
    }
}

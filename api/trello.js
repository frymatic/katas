export default async function handler(req, res) {
    const { TRELLO_API_KEY, TRELLO_API_SECRET } = process.env;
    const trelloCardId = req.query.cardId;

    const response = await fetch(
        `https://api.trello.com/1/cards/${trelloCardId}/checklists?key=${TRELLO_API_KEY}&token=${TRELLO_API_SECRET}`
    );
    const data = await response.json();

    res.status(200).json(data);
}
